import { NextResponse } from "next/server";
import { getCurrentAccount } from "../helpers/utils";
import prisma from "@/lib/prisma"
import { Message } from "@prisma/client";

const MESSAGES_BATCH = 10; 

export async function GET(
    req: Request
){
    try{
        const account = await getCurrentAccount();
        const {searchParams} = new URL(req.url)

        const cursor = searchParams.get("cursor")
        const channelId = searchParams.get("channelId")

        if(!account){
            return new NextResponse("NO_VALID_ACCOUNT", {status: 401})
        }

        if(!channelId){
            return new NextResponse("CHANNEL_ID_MISSING", {status: 400})
        }

        let messages : Message[] = [];

        if(cursor){
            messages = await prisma.message.findMany({
                take: MESSAGES_BATCH,
                skip: 1,
                cursor:{
                    id: cursor
                },
                where:{
                    channelId: channelId
                },
                include:{
                    member:{
                        include:{
                            profile: {
                                include: {
                                    user:{
                                        select:{
                                            image:true,
                                            name: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                orderBy:{
                    createdAt:"desc"
                }               
            })
        }else{
            messages = await prisma.message.findMany({
                take: MESSAGES_BATCH,
                where:{
                    channelId
                },
                include:{
                    member:{
                        include:{
                            profile: {
                                include: {
                                    user:{
                                        select:{
                                            image:true,
                                            name: true,
                                        }
                                    }
                                }
                            }
                        }
                    }
                },
                orderBy:{
                    createdAt: "desc"
                }
            })
        }

        let nextCursor = null;

        if(messages.length === MESSAGES_BATCH){
            nextCursor = messages[MESSAGES_BATCH - 1].id;
        }
        return NextResponse.json({items: messages, nextCursor: nextCursor})
    }catch(error){
        console.log("[MESSAGES_GET]", error);
        return new NextResponse("INTERNAL_ERROR", {status: 500})
    }
}
