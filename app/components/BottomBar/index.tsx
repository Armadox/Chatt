'use client'

import Image from "next/image"
import BrushImage from "../../../public/images/brush-big-banner-bottom.png"
import Button from "../Button"


interface BottomBarProps{
   
}

const BottomBar:React.FC<BottomBarProps> = ({}) => {
    return(
        <div className="fixed h-full w-full">
            <Image src={BrushImage} alt="" className={`overflow-visible object-cover fixed inset-x-0 bottom-0`}/>
        </div>
    )
}

export default BottomBar