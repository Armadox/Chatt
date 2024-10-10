'use client'

import Image from "next/image"
import BannerImage from "../../../public/images/output.jpg"
import Top from "../../../public/images/brush-big-banner-top.png"
import Bottom from "../../../public/images/brush-big-banner-bottom.png"
import End from "../../../public/images/brush-big-banner-2.png"
import RedCircle from "../../../public/images/red-circle.png"


interface DirectProfileProps{
    
}

const DirectProfile:React.FC<DirectProfileProps> = () => {
    return(
        <div className="h-full min-w-[15rem] max-w-[15rem] bg-stone-300 flex flex-col">
            <div className="h-[20rem] w-full mb-10">
                <Image src={Top} alt="" className="object-cover w-[15rem] absolute bg-center bg-cover"/>
                <Image src={End} alt="" className="object-cover w-[15rem] absolute bg-center bg-cover mt-[18rem]"/>
                <Image src={BannerImage} alt="" className="h-[20rem] object-cover bg-center bg-cover border-b-4 border-black"/>
                <div className="w-full flex items-center justify-center mt-[-20px]">
                    <Image src={RedCircle} alt="" className="h-[4rem] relative z-20 w-[4rem] bg-center bg-cover"/>
                </div>
            </div>
            <div className="w-full flex items-center justify-center text-black text-4xl mb-10">
                    Armadoxu
            </div>
            <Image src={Bottom} alt="" className="object-cover w-[15rem] bg-center bg-cover mb-[-2px]"/>
            <div className="w-full h-full bg-black text-xl flex items-center">
                <span>My peanuts are humoungos and they love to jiggle jiggle in the air like they dont care. My dick can extend like wukongs winger pole and I am always in the thrusting stance. Test Test Test Test Test Test </span>
            </div>
        </div>
    )
}

export default DirectProfile