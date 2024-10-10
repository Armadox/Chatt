'use client'

import Image from "next/image"
import RedCircle from "../../../public/images/red-circle.png"


interface FriendFieldProps{
    
}

const FriendField:React.FC<FriendFieldProps> = () => {
    return(
        <div className="rounded w-[14rem] my-3 h-[3rem] flex items-center pl-2">
            <Image src={RedCircle} alt={""} className="bg-contain bg-center bg-contain bg-no-repeat h-[2.5rem] w-[2.5rem]"/>
            <span className="ml-2">FriendName Ady</span>
        </div> 
    )
}

export default FriendField