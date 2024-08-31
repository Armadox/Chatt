'use client'

import Image from "next/image"
import BrushImage from "../../../public/images/brush-stroke-banner-r.png"
import Button from "../Button"


interface BorderProps{
    position: "left" | "right"
}

const Border:React.FC<BorderProps> = ({position}) => {
    return(
        <div className="sticky h-full w-[5rem] flex items-center overflow-hidden">
            <Image src={BrushImage} alt="" className={`object-fill h-[140%] w-full absolute ${position === "left" ? "left-10" : "right-10"}`}/>
        </div>
    )
}

export default Border