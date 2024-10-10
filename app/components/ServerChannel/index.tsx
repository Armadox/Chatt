"use client"

import { Channel, MemberRole } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

interface ServerChannelProps{
    channelName: string,
    channelId: string,
    serverId: string,
    currentRole: MemberRole,
}

const ServerChannel:React.FC<ServerChannelProps> = ({channelName, channelId, serverId, currentRole}) => {
    const router = useRouter();

    const onClick = () => {
        router.push(`/servers/${serverId}/channels/${channelId}`)
    }

    return ( 
        <div className="cursor-pointer" onClick={onClick}>
            {channelName}
        </div> 
    );
}
 
export default ServerChannel;