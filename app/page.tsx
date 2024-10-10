import Button from "./components/Button";  
import ChattBox from "./components/ChattBox";
import DirectProfile from "./components/DirectProfile";
import MenuList from "./components/MenuList";
import Menu from "./components/Menu";
import Separation from "./components/Separation";
import SignIn from "./components/SignIn";
import { getCurrentAccount } from "./api/helpers/utils";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import ServerCreator from "./components/ServerCreator";

export default async function Home() {
  const account = await getCurrentAccount()

  if(!account){
    return null
  }

  const server = await prisma.server.findFirst({
    where:{
        members: {
          some:{
            userId: account.userId
          }
        }
    }
  })

  if(server){
    redirect(`/servers/${server.id}`);  
  }

  return(
    <><ServerCreator account={account}/></>
  )
}
