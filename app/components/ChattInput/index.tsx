'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import qs from "query-string"
import axios from "axios";

interface ChattInputProps{
    apiUrl: string,
    query: {
        userId: string,
        serverId: string,
        channelId: string,
    }
}

const ChattInput:React.FC<ChattInputProps> = ({apiUrl, query}) => {
    const [isLoading, setIsLoading] = useState(false)
    const [message, setMessage] = useState<string>("");

    const handleSumbit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        try{
            const url = qs.stringifyUrl({
                url: apiUrl,
                query
            });
            await axios.post(url, {
                content: message
            });
            setIsLoading(false);
        }catch(err){
            console.log("FAILED SENDING MESSAGE: ", err)
        }
    }


    return(
        <form onSubmit={handleSumbit} className="w-[80%]">
            <input disabled={isLoading} placeholder="Message" onChange={(e) => setMessage(e.target.value)} className="max-h-[20rem] h-[3rem] w-full bg-white text-black bg-opacity-75 rounded"/>
            <button type="submit" className="absolute top-7 right-8 h-[24px] w-[24px] bg-zinc-500 hover:bg-zinc-600"/>
        </form>
    )
}

export default ChattInput