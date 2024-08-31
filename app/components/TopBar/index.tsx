'use client'

import Image from "next/image"
import BrushImage from "../../../public/images/brush-big-banner-top.png"
import Button from "../Button"


interface TopBarProps{
   
}

const TopBar:React.FC<TopBarProps> = ({}) => {
    return(
        <div className="fixed h-full w-full">
            <Image src={BrushImage} alt="" className={`overflow-visible object-cover fixed inset-x-0 top-0`}/>
        </div>
    )
}

export default TopBar