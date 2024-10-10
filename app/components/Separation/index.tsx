'use client'

import Image from "next/image"
import BrushImage from "../../../public/images/brush-stroke-banner-r.png"
import Button from "../Button"


interface SeparationProps{
    
}

const Separation:React.FC<SeparationProps> = () => {
    const backgroundImage = `/images/brush-stroke-banner-long.png`;
    return(
        <div style={{ backgroundImage: `url(${backgroundImage})`}} className="h-full w-[0.5rem] bg-center bg-[length:110%_120%] overflow-visible m-[-3px]"/>
    )
}

export default Separation