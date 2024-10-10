"use client"

import { Account, Member } from "@prisma/client";
import Image from "next/image"


interface ChattItemProps{
    id: string,
    image: string,
    name: string,
    content: string,
    member: Member & {
        profile: Account
    };
    timestamp: string,
    deleted: boolean,
    currentMember: Member,
    isUpdated: boolean,
    socketUrl: string,
    socketQuery: Record<string, string>
}

const ChattItem:React.FC<ChattItemProps> = ({id, content, member, name, timestamp, deleted, currentMember, isUpdated, socketUrl, socketQuery, image}) => {
    return ( 
        <div className="relative group flex items-center hover:bg-black/5 p-4 transition w-full">
            <div className="group flex gap-x-2 items-start w-full">
                <div className="cursor-pointer hover:drop-shadow-md transition">
                    <Image src={image} height={400} width={400} alt={""} className="bg-contain bg-center bg-contain bg-no-repeat h-[3rem] w-[3rem] rounded-full"/>
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center gap-x-2">
                        <div className="flex items-center">
                            <p className="font-semibold text-sm hover:underline cursor-pointer">{name}</p>
                        </div>
                        <span className="text-xs text-zinc-500">{timestamp}</span>
                    </div>
                    {content}
                </div>
            </div>
        </div> 
    );
}
 
export default ChattItem;