'use client'
import Image from "next/image"
import { useSocket } from "../SocketProvider";


interface ChattHeaderProps{
    imageName: string,
    serverName: string | null,
}

const ChattHeader:React.FC<ChattHeaderProps> = ({imageName, serverName}) => {
    const {isConnected} = useSocket();
    return(
        <div className="w-full h-[6rem] bg-opacity-50">
            <div className="rounded w-[20rem] h-full flex items-center justify-center">
                <Image src={`/uploads/${imageName}.webp`} height={400} width={400} alt={""} className="bg-contain rounded-full bg-center bg-contain bg-no-repeat h-[5rem] w-[5rem]"/>
                <span className="ml-1 mr-4">{serverName}</span>
                {isConnected ? (<div className="w-4 h-4 bg-green-400 rounded-full"/>) : (<div className="w-4 h-4 bg-red-400 rounded-full"/>)}
            </div>
        </div>
    )
}

export default ChattHeader