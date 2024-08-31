'use client'

import Image from "next/image";
import BrushImage1 from "../../../public/images/brush-stroke-banner-1.png"
import BrushImage2 from "../../../public/images/brush-stroke-banner-2.png"
import BrushImage3 from "../../../public/images/brush-stroke-banner-3.png"
import BrushImage4 from "../../../public/images/brush-stroke-banner-4.png"
import BrushImage5 from "../../../public/images/brush-stroke-banner-5.png"


interface ButtonType{
    label: string;
    style: 0 | 1 | 2 | 3 | 4 | 5;
    onClick?: () => void;
}


const Button:React.FC<ButtonType> = ({label, onClick, style}) => {
    const imageMap = [BrushImage1, BrushImage2, BrushImage3, BrushImage4, BrushImage5]
    return(
    <div onClick={onClick} className={"w-[120px] h-[40px] flex justify-center items-center duration-300 hover:invert cursor-pointer"}>
        <Image src={imageMap[style]}
        alt={""} width={120} height={"100"} className="absolute"/>
        <span className="z-10 relative">{label}</span>
    </div>
    )
}

export default Button