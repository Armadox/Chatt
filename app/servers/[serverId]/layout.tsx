import { getCurrentAccount, getServer } from "@/app/api/helpers/utils";
import MenuList from "@/app/components/MenuList";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({children, params} : {children: React.ReactNode; params: {serverId: string}}) => {
    const currentAccount = await getCurrentAccount();

    if(!currentAccount){
        return redirect('/')
    }

    const currentServer = await getServer(params.serverId, currentAccount.userId)
    
    if(!currentServer){
        return null
    }

    return (
        <div className="h-full w-full flex overflow-hidden">
            <MenuList listType="channels" id={params.serverId}/>
            {children}
        </div>
    );
}
 
export default ServerIdLayout;