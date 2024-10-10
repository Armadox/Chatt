import prisma from "@/lib/prisma";
import {  PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";



export const POST = async (req: Request) => {
  try {
    const {memberId, serverId, role} = await req.json();

    if(!memberId || !serverId || !role){
      return null
    }

    const member = await prisma.member.update({
      where:{
        id: memberId as string,
        serverId: serverId as string,
      },
      data:{
        role: role,
      }
    })

    console.log("IT WORKED HALELUJA")
    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    console.error("Something went wrong:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
