'use client'

import { useState } from "react";
import Brushed from "../Brushed";
import Image from "next/image"

interface InviteFieldProps{
    image: string;
    name: string;
    code: string;
}

const InviteField:React.FC<InviteFieldProps> = ({image, name, code}) => {
    const [open, setOpen] = useState(false)
    return ( 
    <div>
        <div className="cursor-pointer text-white hover:text-red-600 text-xl flex items-center justify-center m-2" onClick={() => setOpen(true)}>
            <span className="h-[70%]">- Invite to server -</span>
        </div>
        <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
            <div className="bg-black h-full w-full opacity-50 cursor-pointer" onClick={() => setOpen(!open)}/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Brushed brush={"5"}>
                    <div className="p-10 flex flex-col items-center">
                        <Image src={`/uploads/${image}`} height={400} width={400} alt={""} className="bg-contain bg-center bg-contain bg-no-repeat h-[5rem] w-[5rem] m-2"/>
                        <div className="text-xl m-2">- {name} -</div>
                        <div>Code: {code}</div>
                    </div>
                </Brushed>
            </div>
        </div>
    </div>
    );
}
 
export default InviteField;