import { getCurrentAccount, getCurrentUser } from "@/app/api/helpers/utils";
import prisma from "@/lib/prisma";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo
){
    if(req.method !== "POST"){
        return res.status(405).json({error: "METHOD_NOT_ALLOWED"});
    }

    try{
        const {content} = req.body;
        const {serverId, channelId, userId} = req.query;

        const profile = await prisma.account.findUnique({
            where:{
                userId: userId as string
            }
        })
        
        if(!profile){
            return res.status(401).json({error: "UNAUTHORIZED"})
        }
        if(!serverId){
            return res.status(400).json({error: "SERVER ID MISSING"})
        }
        if(!channelId){
            return res.status(400).json({error: "CHANNEL ID MISSING"})
        }
        if(!content){
            return res.status(400).json({error: "CONTENT MISSING"})
        }

        const server = await prisma.server.findFirst({
            where:{
                id: serverId as string,
                members:{
                    some:{
                        userId: profile.userId as string
                    }
                }
            },
            include:{
                members: true
            }
        })

        if(!server){
            return res.status(404).json({message: "SERVER_NOT_FOUND"})
        }

        const channel = await prisma.channel.findFirst({
            where:{
                id: channelId as string,
                serverId: serverId as string,

            }
        })

        if(!channel){
            return res.status(404).json({message: "CHANNEL_NOT_FOUND"})
        }

        const member = server.members.find((member) => member.userId === profile.userId);

        console.log("MEMBER: ", member)

        if(!member){
            return res.status(404).json({message: "MEMBER_NOT_FOUND"})
        }

        const message = await prisma.message.create({
            data:{
                content: content as string,
                channelId: channelId as string,
                memberId: member.id as string,
            },
            include:{
                member: {
                    include: {
                        profile: true
                    }
                }
            }
        })

        const channelKey = `chat:${channelId}:messages`;

        res?.socket?.server?.io?.emit(channelKey, message)

        return res.status(200).json(message)
    }catch(error){
        console.log("[MESSAGES_POST] ", error)
        return res.status(500).json({message: "INTERNAL_ERROR"});
    }
}