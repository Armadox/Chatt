'use client'

import Image from "next/image"
import BrushImage from "../../../public/images/brush-stroke-banner-r.png"
import Button from "../Button"


interface MenuProps{
    
}

const Menu:React.FC<MenuProps> = () => {
    return(
        <div className="fixed h-full w-[14rem]">
            <div className="h-full absolute w-full z-10">AAAAAAAAAAA</div>
            <div className="absolute h-full w-full flex items-center right-[8rem]">
                <Image src={BrushImage} alt="" className="h-[140%] w-full object-fill absolute"/>
            </div>
        </div>
    )
}

export default Menu