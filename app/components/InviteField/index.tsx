'use client'

import { useState } from "react";

interface InviteFieldProps{
    image: string;
    name: string;
    code: string;
}

const InviteField:React.FC<InviteFieldProps> = ({image, name, code}) => {
    const [open, setOpen] = useState(false)
    return ( 
    <div>
        <div className="cursor-pointer h-[60px] w-[60px] bg-white transition-all rounded-[28px] hover:rounded-[16px] text-black text-3xl flex items-center justify-center" onClick={() => setOpen(true)}>
            <span className="h-[70%]">+</span>
        </div>
        <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
            <div className="bg-black h-full w-full opacity-50 cursor-pointer" onClick={() => setOpen(!open)}/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
                <div>{image}</div>
                <div>{name}</div>
                <div>{code}</div>
            </div>
        </div>
    </div>
    );
}
 
export default InviteField;