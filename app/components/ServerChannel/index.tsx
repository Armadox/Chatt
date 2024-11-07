"use client"

import { useToken } from "@/helpers/TokenContext";
import { Channel, ChannelType, MemberRole } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

interface ServerChannelProps{
    userName: string | null,
    channelName: string,
    channelId: string,
    serverId: string,
    currentRole: MemberRole,
    type: ChannelType,
}

const ServerChannel:React.FC<ServerChannelProps> = ({userName, channelName, channelId, serverId, type, currentRole}) => {
    const router = useRouter();
    const { setToken, setName } = useToken(); // Use the context

    const getToken = async (name: string | null, room: string | null) => {
        if (!room || !name) {
            console.log("MISSING NAME | ROOM");
            return;
        }
        try {
            const resp = await fetch(`/api/getParticipantToken?room=${room}&username=${name}`);
            const data = await resp.json();
            console.log("EXECUTIN AUDIO!", data.token);
            setName(channelName)
            setToken(data.token); // Update the context state
        } catch (e) {
            console.error(e);
        }
    };

    const onClick = () => {
        if(type === "TEXT"){
            router.push(`/servers/${serverId}/channels/${channelId}`)
        }else{
            getToken(userName, channelId)
        }
    }

    return ( 
        <div className="cursor-pointer" onClick={onClick}>
            {channelName}
        </div> 
    );
}
 
export default ServerChannel;