import { getChannels, getChannels2, getCurrentAccount, getCurrentRole, getMembers, getServer } from "@/app/api/helpers/utils";
import MenuList from "@/app/components/MenuList";
import { TokenProvider } from "@/helpers/TokenContext";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({children, params} : {children: React.ReactNode; params: {serverId: string}}) => {
    const currentAccount = await getCurrentAccount();
    if(!currentAccount){
        return redirect('/')
    }

    const currentChannels = await getChannels(params.serverId);
    if(!currentChannels){
        return null
    }

    const currentMembers = await getMembers(params.serverId);
    if(!currentMembers){
        return null
    }
    const currentRole = await getCurrentRole(params.serverId, currentAccount.userId);
    if(!currentRole){
        return null
    }

    const currentServer = await getServer(params.serverId, currentAccount.userId)
    
    if(!currentServer){
        return null
    }

    return (
        <div className="h-full w-full flex overflow-hidden">
            <TokenProvider>
                <MenuList id={params.serverId} currentAccount={currentAccount} currentChannels={currentChannels} currentMembers={currentMembers} currentRole={currentRole.role}/>
                {children}
            </TokenProvider>
        </div>
    );
}
 
export default ServerIdLayout;