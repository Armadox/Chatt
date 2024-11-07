'use client'

import Image from "next/image"
import { Account, Server } from "@prisma/client"
import { useRouter, useParams } from "next/navigation"
import ServerCreator from "../ServerCreator";
import { useState } from "react";
import JoinGroup from "../JoinGroup";


interface MenuProps{
    servers: Server[] | null;
    account: Account | null;  
}

const Menu:React.FC<MenuProps> = ({servers, account}) => {
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    if(!servers){
        return null
    }

    const serverNames = Object.keys(servers).map((key: any) => servers[key]);

    const handleClick = (id: string) => {
        router.push(`/servers/${id}`); 
    }

    return(
        <div className="h-full min-w-[5rem] w-[5rem] max-w-[5rem] bg-[#060606] flex flex-col overflow-y-scroll scroll-smooth">
            <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
                <div className="bg-black h-full w-full opacity-50 cursor-pointer" onClick={() => setOpen(!open)}/>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ServerCreator account={account}/>
                </div>
            </div>
            <div className={`fixed inset-0 z-50 ${open2 ? "block" : "hidden"}`}>
                <div className="bg-black h-full w-full opacity-50 cursor-pointer" onClick={() => setOpen2(!open2)}/>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <JoinGroup account={account}/>
                </div>
            </div>
            {/*<div className="h-[4rem] mx-2 bg-[url('../public/images/home2.png')] bg-center bg-contain bg-no-repeat"/>*/}
            <div className="min-h-[10rem] h-[10rem] flex my-8 items-center justify-center">
                <span className="transform text-3xl rotate-[-90deg] origin-center text-white cursor-pointer">
                    SAMURAI
                </span>
            </div>
            <div className="h-full flex flex-col items-center gap-6">
                <hr className="h-1 w-[80%] text-white"/>
                <div className="cursor-pointer h-[60px] w-[60px] bg-white transition-all rounded-[28px] hover:rounded-[16px] text-black text-3xl flex items-center justify-center" onClick={() => setOpen(true)}>
                    <span className="h-[70%]">+</span>
                </div>
                <div className="cursor-pointer h-[60px] w-[60px] bg-white transition-all rounded-[28px] hover:rounded-[16px] text-black text-3xl flex items-center justify-center" onClick={() => setOpen2(true)}>
                    <span className="h-[70%]">S</span>
                </div>
                <hr className="h-1 w-[80%] text-white"/>
                {serverNames.map((server) => (
                    <div key={server.id} className="relative cursor-pointer overflow-visible h-[60px] w-[60px] rounded-full bg-[url('../public/images/round.png')] bg-center bg-cover bg-no-repeat"
                        onClick={() => handleClick(server.id)}>
                        {server.id === params?.serverId ? (
                            <Image src={`/images/red-circle.png`} width={85} height={85} alt={""} className="absolute h-full w-full bg-center bg-cover object-contain invert"/>) : (
                            <Image src={`/images/red-circle.png`} width={85} height={85} alt={""} className="absolute h-full w-full bg-center bg-cover object-contain block hover:invert-[55%] transition-all"/>)}
                        <Image src={`/uploads/${server.serverImage}`} width={70} height={70} alt={""} className="h-full rounded-full w-full bg-center bg-cover object-contain"/>
                    </div>
                ))}
            </div>
            <div className="h-[15rem] my-8 flex items-center justify-center">
            </div>
        </div>
    )
}

export default Menu