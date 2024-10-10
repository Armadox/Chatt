'use client'

import { useState } from "react";

interface ChannelCreatorProps{
    serverId: string,
    userId: string,
}

const ChannelCreator:React.FC<ChannelCreatorProps> = ({serverId, userId}) => {
    const [open, setOpen] = useState(false)
    const [channelName, setChannelName] = useState("");
    const [channelType, setChannelType] = useState<"TEXT" | "AUDIO">("TEXT");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try{
            const response = await fetch("/api/createChannel", {
                method: "POST",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({
                    channelName,
                    channelType,
                    serverId,
                    userId
                }),
            });
            if (response.ok) {
                console.log("Role updated successfully");
              } else {
                console.error("Failed to update role");
              }
        }catch(err){
            console.error("Error submitting form:", err);
        }
    }
    return ( 
    <div>
        <div className="cursor-pointer h-[60px] w-[60px] bg-white transition-all rounded-[28px] hover:rounded-[16px] text-black text-3xl flex items-center justify-center" onClick={() => setOpen(true)}>
            <span className="h-[70%]">+</span>
        </div>
        <div className={`fixed inset-0 z-50 ${open ? "block" : "hidden"}`}>
            <div className="bg-black h-full w-full opacity-50 cursor-pointer" onClick={() => setOpen(!open)}/>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white">
            <form onSubmit={handleSubmit}>
                {/* Channel Name */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Channel Name</label>
                <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                </div>

                {/* Channel Type */}
                <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Channel Type</label>
                <select
                    value={channelType}
                    onChange={(e) => setChannelType(e.target.value as "TEXT" | "AUDIO")}
                    className="w-full p-2 border border-gray-300 rounded"
                >
                    <option value="TEXT">Text</option>
                    <option value="AUDIO">Audio</option>
                </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
                    Create Channel
                </button>
                </div>
            </form>
            </div>
        </div>
    </div>
    );
}
 
export default ChannelCreator;