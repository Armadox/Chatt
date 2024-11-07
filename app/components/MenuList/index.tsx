"use client"
import { Account, Channel, ChannelType, Member, MemberRole, Server } from "@prisma/client";
import InviteField from "../InviteField";
import MemberMenu from "../MemberMenu";
import ChannelCreator from "../ChannelCreator";
import ServerChannel from "../ServerChannel";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSocket } from "../SocketProvider";
import { TokenProvider, useToken } from "@/helpers/TokenContext";

import {
  ControlBar,
  LiveKitRoom,
  RoomAudioRenderer,
} from '@livekit/components-react';
import Brushed from "../Brushed";



interface MenuListProps{
    id: string;
    currentAccount: AccountWithUser;
    currentChannels: ServerWithMembersAndChannels;
    currentMembers: MemberWithAccount[];
    currentRole: MemberRole,

}

interface ServerWithMembersAndChannels extends Server {
    members: Member[],
    channels: Channel[],
  }

interface MemberWithAccount extends Member {
    profile:{
      user:{
        name: string | null;
        email: string | null;
        image: string | null
      }
      userId: string;
    };
  }

interface AccountWithUser extends Account {
      user: {
        name: string | null;
        image: string | null
      }
  }



const MenuList:React.FC<MenuListProps> = ({id, currentAccount, currentChannels, currentMembers, currentRole}) => {
    const {token, setToken, name} = useToken()
    const {socket, isConnected} = useSocket()
    const [channels, setChannels] = useState<Channel[]>(currentChannels.channels);
    const [channelName, setChannelName] = useState<string | null>()
    const channelKey = `server:${id}:channels`

    const members = currentMembers.filter((member) => member.userId !== id);
    const role = currentMembers.find((member) => member.userId !== id)?.role;

    useEffect(() => {
      console.log("USING USEEFFECT", channelKey);
      if (socket) {
        console.log("SETTING UP THE SOCKET")
          socket.on(`server:${id}:channels`, (newChannel) => {
              console.log("SOCKET EXECUTED TO FETCH NEW CHANNEL", newChannel);
              setChannels((prevChannels) => [...prevChannels, newChannel])
          });
            
        
          return () => {
            console.log("SETTING OFF THE SOCKET")
            socket.off(channelKey);
          };
      }
    }, [socket, channelKey]);

    useEffect(() => {
      console.log("WHY NOT WORKIN?")
      setChannelName(name)
    }, [name, token]);

    
    return(
        <div className="h-full bg-stone-900 bg-opacity-50 flex flex-col flex-none items-center overflow-y-auto">
            <div className="h-[5.5rem] flex flex-none items-center justify-center text-2xl text-red-600">{currentChannels.name}</div>
            <Brushed brush={"1"}>
              <div className="m-5">
                <InviteField image={"" + currentChannels.serverImage} name={"" + currentChannels.name} code={"" + currentChannels.inviteCode}/>
                <ChannelCreator serverId={id} userId={currentAccount.userId}/>
              </div>
            </Brushed>
            <MemberMenu members={currentMembers} currentRole={currentRole} serverId={id}/>
            {/*(currentRole === "ADMIN" || currentRole === "MODERATOR") && <div>create/delete channels, ban users</div>*/}
            {/*(currentRole === "ADMIN") && <div>Delete server, change image, assign role</div>*/}
            <div className="w-[14rem] flex flex-col text-md my-4">
                <div className="">- Text Channels</div>
                <div className="pl-2">
                  {channels.map((channel) => (
                      channel.type === ChannelType.TEXT &&
                      <ServerChannel key={channel.id}
                          channelName={channel.name} 
                          channelId={channel.id} 
                          serverId={id} 
                          currentRole={currentRole}
                          type={"TEXT"}
                          userName={currentAccount.user.name}/>
                  ))}
                </div>
                <div className="mt-4">- Audio Channels</div>
                <div className="pl-2">
                  {channels.map((channel) => (
                      channel.type === ChannelType.AUDIO &&
                      <ServerChannel key={channel.id}
                          channelName={channel.name} 
                          channelId={channel.id} 
                          serverId={id} 
                          currentRole={currentRole}
                          type={"AUDIO"}
                          userName={currentAccount.user.name}/>
                  ))}
                </div>
            </div>
            {token &&
            <LiveKitRoom
              key={token}
              screen={false}
              audio={true}
              token={token}
              serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
              onDisconnected={() => setToken("")}
              // Use the default LiveKit theme for nice styles.
              data-lk-theme="default"
              className="w-full"
              >
              {/* The RoomAudioRenderer takes care of room-wide audio for you. */}
              <RoomAudioRenderer/>
              {/* Controls for the user to start/stop audio, video, and screen
              share tracks and to leave the room. */}
              {channelName &&
              <div className="bg-[#060606] text-xl control-bar w-full h-[80px] flex flex-col items-center justify-center">
                <div className="flex items-center justify-center">
                  <div>{name}</div>
                
                  <div className={`w-5 h-5 rounded-full ${isConnected? "bg-green-500" : "bg-red-500"}`}></div>
                </div>

                <ControlBar variation="minimal" controls={{screenShare: false, camera: false, chat: false, settings: false}}/>
              </div>}
            </LiveKitRoom>}
        </div>
        )
}

export default MenuList