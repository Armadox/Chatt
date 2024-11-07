'use client'

import { useState } from "react";
import { useSocket } from "../SocketProvider";
import Brushed from "../Brushed";

interface ChannelCreatorProps{
    serverId: string,
    userId: string,
}

const ChannelCreator:React.FC<ChannelCreatorProps> = ({serverId, userId}) => {
    const {socket} = useSocket()
    const [open, setOpen] = useState(false)
    const [channelName, setChannelName] = useState("");
    const [channelType, setChannelType] = useState<"TEXT" | "AUDIO">("TEXT");
    const channelKey = `server:${serverId}:channels`

    const handleSubmit = async (e: React.FormEvent) => {
        console.log("EXECUTING SENDING MESSAGE SUBMIT")
        e.preventDefault();
        
        if (socket) {
            socket.emit(`sendingChannel`, serverId, channelType, channelName, userId);
            setChannelName("");
            setChannelType("TEXT");
            setOpen(false);
        }
    }


    return ( 
    <div>
        <div className="cursor-pointer text-white hover:text-red-600 text-xl flex items-center justify-center m-2" onClick={() => setOpen(true)}>
            <span className="h-[70%]">- Create Channel -</span>
        </div>
        <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
            <div className="bg-black h-full w-full opacity-50 cursor-pointer" onClick={() => setOpen(!open)}/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Brushed brush={"1"}>
                <form onSubmit={handleSubmit} className="m-5">
                    {/* Channel Name */}
                    <div className="m-3">
                    <label className="block text-sm font-medium mb-1 text-center">Channel Name</label>
                    <input
                        type="text"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                        required
                    />
                    </div>

                    {/* Channel Type */}
                    <div className="m-3">
                    <label className="block text-sm font-medium mb-1 text-center">Channel Type</label>
                    <select
                        value={channelType}
                        onChange={(e) => setChannelType(e.target.value as "TEXT" | "AUDIO")}
                        className="w-full p-2 border border-gray-300 rounded text-black"
                    >
                        <option value="TEXT">Text</option>
                        <option value="AUDIO">Audio</option>
                    </select>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center m-5">
                        <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md">
                            Create Channel
                        </button>
                    </div>
                </form>
            </Brushed>
            </div>
        </div>
    </div>
    );
}
 
export default ChannelCreator;