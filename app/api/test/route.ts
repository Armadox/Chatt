import prisma from "@/lib/prisma";
import { NextApiResponseServerIo } from "@/types";
import { ChannelType } from "@prisma/client";
import { NextRequest } from "next/server";

export default async function handler(
    req: Request,
    res: NextApiResponseServerIo
){
    console.log("EXECUUUUUTING1")
    if(req.method !== "POST"){
        return res.status(405).json({error: "METHOD_NOT_ALLOWED"});
    }

    try {
        const {serverId, channelType, channelName, userId} = await req.json();

        if (!serverId || !channelType || !channelName || !userId) {
            return res.status(401).json({error: "UNAUTHORIZED"});
        }

        const newChannel = await prisma.channel.create({
            data:{
                    name: channelName as string,
                    userId: userId as string,
                    serverId: serverId as string,
                    type: channelType as ChannelType
                }
                });

        const channelKey = `server:${serverId}:channels`;
        res?.socket?.server?.io?.emit(channelKey, newChannel)

        return res.status(200).json({success: "CHANNEL_CREATED!"})
      }catch(error){
        console.log("[CHANNEL_CREATION] ", error)
        return res.status(500).json({message: "INTERNAL_ERROR"});
    }
}