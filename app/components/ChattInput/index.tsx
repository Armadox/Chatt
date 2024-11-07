'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";
import qs from "query-string"
import axios from "axios";
import { useSocket } from "../SocketProvider";

interface ChattInputProps {
    apiUrl: string,
    query: {
        userId: string,
        serverId: string,
        channelId: string,
        memberId: string,
    }
}

const ChattInput: React.FC<ChattInputProps> = ({ apiUrl, query }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>("");
    const { socket } = useSocket();

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("EXECUTING SENDING MESSAGE SUBMIT")
        e.preventDefault();
        setIsLoading(true);
        try {
            socket?.emit("sendingMessage", message, query.memberId, query.channelId);
            setMessage(""); // Reset message state after sending
            setIsLoading(false); // Ensure loading state is reset in both success and error cases
        } catch (err) {
            console.log("FAILED SENDING MESSAGE: ", err);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="w-[80%]">
            <input 
                disabled={isLoading} 
                placeholder="Message" 
                onChange={(e) => setMessage(e.target.value)} 
                value={message}
                className="max-h-[20rem] h-[3rem] w-full bg-white text-black bg-opacity-75 rounded" 
            />
        </form>
    )
}

export default ChattInput;
