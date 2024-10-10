'use client'

import Image from "next/image"
import RedCircle from "../../../public/images/red-circle.png"
import ConnectionStatus from "../ConnectionStatus"

interface ChattHeaderProps{
    imageName: string,
    serverName: string | null,
}

const ChattHeader:React.FC<ChattHeaderProps> = ({imageName, serverName}) => {
    return(
        <div className="w-full h-[6rem] bg-opacity-50">
            <div className="rounded w-[20rem] h-full flex items-center">
                <Image src={`/uploads/${imageName}.webp`} height={400} width={400} alt={""} className="bg-contain bg-center bg-contain bg-no-repeat h-[5rem] w-[5rem]"/>
                <span className="ml-1">{serverName}</span>
                <ConnectionStatus/>
            </div>
        </div>
    )
}

export default ChattHeader