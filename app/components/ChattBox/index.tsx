import ChattHeader from "../ChattHeader"
import ChattInput from "../ChattInput"
import { Member, Server } from "@prisma/client"
import ChattMessages from "../ChattMessages"

interface ChattBoxProps{
    serverId: string,
    channelId: string,
    userId: string,
    server: Server,
    member: Member,
}

const ChattBox:React.FC<ChattBoxProps> = ({serverId, channelId, userId, server, member}) => {
    return(
        <div className="h-full w-full bg-stone-900 bg-opacity-50 flex flex-col">
            <ChattHeader imageName={server.inviteCode} serverName={server.name}/>
            <div className="flex flex-col h-full bg-black bg-opacity-60 w-full justify-between rounded-t-xl">
            <ChattMessages userId={userId} chatId={channelId} apiUrl={"/api/messages/"} socketUrl={""} socketQuery={{
                    channelId: channelId,
                    serverId: serverId}}
                    paramValue={channelId} 
                    channelId={channelId} 
                    member={member}/>
            <div className="flex items-center justify-center h-[80px]">
                <ChattInput apiUrl={"/api/socket/messages"} query={{
                    userId: userId,
                    serverId: serverId,
                    channelId: channelId,
                    memberId: member.id
                }}/>
            </div>
            </div>
        </div>
    )
}

export default ChattBox