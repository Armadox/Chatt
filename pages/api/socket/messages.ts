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

        if(!serverId || !channelId || !content){
            return res.status(401).json({error: "UNAUTHORIZED"})
        }

        const server = await prisma.server.findFirst({
            where:{
                id: serverId as string,
                members:{
                    some:{
                        userId: userId as string
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

        const member = server.members.find((member) => member.userId === userId);

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
                        profile: {
                            include: {
                                user :{
                                    select: {
                                        image: true,
                                        name: true,
                                    }
                                }
                            }
                        }
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