import {Server as NetServer} from "http"
import { NextApiRequest } from "next"
import {Server as ServerIO} from "socket.io"

import { NextApiResponseServerIo } from "@/types"
import prisma from "@/lib/prisma"
import { ChannelType } from "@prisma/client"

export const config = {
    api: {
        bodyParser: false,
    }
}

const IoHandler = (req: NextApiRequest, res: NextApiResponseServerIo) => {
    console.log("EXECUTING IO HANDLER")
    if(!res.socket.server.io){
        const path = "/api/socket/io";
        const httpServer: NetServer = res.socket.server as any;
        const io = new ServerIO(httpServer, {
            path: path,
        });
        
        res.socket.server.io = io
        
        io.on("connect", (socket) => {
            socket.on("sendingMessage", async (content, memberId, channelId) => {
                console.log("RECEIVING MESSAGES ", content, memberId, channelId)
                const message = await prisma.message.create({
                    data:{
                        content: content as string,
                        channelId: channelId as string,
                        memberId: memberId as string,
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
                console.log("MESSAGE: ",message)
                io.emit(`chat:${channelId}:messages`, message)
            })
            socket.on("sendingChannel", async (serverId, channelType, channelName, userId) => {
                const newChannel = await prisma.channel.create({
                    data:{
                        name: channelName as string,
                        userId: userId as string,
                        serverId: serverId as string,
                        type: channelType as ChannelType
                        }
                    });
                io.emit(`server:${serverId}:channels`, newChannel)
            })
        })
    }

    res.end();
}

export default IoHandler