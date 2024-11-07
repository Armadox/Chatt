import { getCurrentAccount, getCurrentMember, getCurrentServer } from "@/app/api/helpers/utils";
import ChattBox from "@/app/components/ChattBox";

const ChannelPage = async ({params}: {params: {channelId: string, serverId: string}}) => {
    const currentAccount = await getCurrentAccount()
    const currentServer = await getCurrentServer(params.serverId)
    const currentMember = await getCurrentMember(currentAccount?.userId, params.serverId)

    if(!currentAccount || !currentMember){
        return <div>ACCOUNT NOT VALID?!</div>
    }

    if(!currentServer){
        return <div>SERVER NOT VALID?!</div>
    }

    return ( 
    <>
        <ChattBox serverId={params.serverId} channelId={params.channelId} userId={currentAccount.userId} server={currentServer} member={currentMember}/>
    </> 
    );
}
 
export default ChannelPage;