import { NextResponse } from "next/server";
import { ChannelType } from "@prisma/client";
import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  const {serverId, channelType, channelName, userId} = await req.json();
  
  if (!serverId || !channelType || !channelName || !userId) {
    return NextResponse.json({
      success: false,
      message: "Missing required fields",
    });
  }

  try {
    const newChannel = await prisma.channel.create({
        data:{
            name: channelName as string,
            userId: userId as string,
            serverId: serverId as string,
            type: channelType as ChannelType
            }
        });

        return NextResponse.json({
          success: true,
          message: "Channel created successfully",
          channel: newChannel,
        });
  } catch (error) {
    console.error("Error creating channel:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong when creating channel",
    });
  }
};
