//localhost:3000/app/api/editMember/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const {memberId, serverId, role} = await req.json();

    if(!memberId || !serverId || !role){
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
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
    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
