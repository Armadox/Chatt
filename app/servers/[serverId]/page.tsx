import { getCurrentAccount, getServers } from "@/app/api/helpers/utils";
import Menu from "@/app/components/Menu";
import MenuList from "@/app/components/MenuList";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface IParams{
    serverId: string
}

const ServerPage = async ({params}: {params: IParams}) => {
    const currentAccount = await getCurrentAccount();

    if(!currentAccount){
        return(<>ERROR WITH CURRENT ACCOUNT</>)
    }

    const channel = await prisma.server.findFirst({
        where:{
            id: params.serverId,
            members:{
                some:{
                    userId: currentAccount.userId
                }
            }
        },
        include:{
            channels: true
        }
      })

      console.log("CHANNELS: ", channel)

    if(!channel){
        return null
    }

    return redirect(`/servers/${params.serverId}/channels/${channel.channels[0].id}`)
}
 
export default ServerPage;