import { getChannels, getCurrentAccount, getCurrentRole, getMembers } from "@/app/api/helpers/utils";
import FriendField from "../FriendField"
import { ChannelType } from "@prisma/client";
import { useState } from "react";
import InviteField from "../InviteField";
import MemberMenu from "../MemberMenu";
import ChannelCreator from "../ChannelCreator";
import ServerChannel from "../ServerChannel";

type ListType = "channels" | "friends"

interface MenuListProps{
    listType : ListType;
    id: string;
}



const MenuList:React.FC<MenuListProps> = async ({listType, id}) => {
    const currentAccount = await getCurrentAccount();

    if(!currentAccount){
        return null
    }

    const currentChannels = await getChannels(id);

    if(!currentChannels){
        return null
    }

    const currentMembers = await getMembers(id);
    const currentRole = await getCurrentRole(id, currentAccount.userId);

    const textChannels = currentChannels?.channels.filter((channel) => channel.type === ChannelType.TEXT)
    const audioChannels = currentChannels?.channels.filter((channel) => channel.type === ChannelType.AUDIO)
    const members = currentChannels?.members.filter((member) => member.userId !== id);
    const role = currentChannels?.members.find((member) => member.userId !== id)?.role;

    if(listType === "channels"){
    return(
        <div className="h-full w-[18rem] min-w-[18rem] bg-stone-900 bg-opacity-50 flex flex-col items-center overflow-hidden">
            <div className="h-[5.5rem] flex items-center justify-center text-2xl text-red-600">{currentChannels.name}</div>
                <InviteField image={"" + currentChannels.serverImage} name={"" + currentChannels.name} code={"" + currentChannels.inviteCode}/>
            <hr className="w-[13rem] mb-2" />
            <ChannelCreator serverId={id} userId={currentAccount.id}/>
            <hr className="w-[13rem] mb-2" />
            <MemberMenu members={currentMembers} currentRole={currentRole?.role} serverId={id}/>
            {(role === "ADMIN" || role === "MODERATOR") && <div>create/delete channels, ban users</div>}
            {(role === "ADMIN") && <div>Delete server, change image, assign role</div>}
            <div className="w-[14rem] flex flex-col">
                <div>Text Channels:</div>
                {textChannels.map((channel) => (
                    <ServerChannel channelName={channel.name} channelId={channel.id} serverId={id} currentRole={"ADMIN"}/>
                ))}
                <div>Audio Channels:</div>
                {audioChannels.map((channel) => (
                    <ServerChannel channelName={channel.name} channelId={channel.id} serverId={id} currentRole={"ADMIN"}/>
                ))}
            </div>
        </div>
        )
    }
}

export default MenuList