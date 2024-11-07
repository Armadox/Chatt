import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getSession(){
    return await getServerSession(authOptions);
}


export async function getCurrentUser() {
  const session = await getSession();
  
  if(!session?.user?.email){
    return null
  }

  const currentUser = await prisma.user.findUnique({
    where:{
        email: session.user.email
    }
  })

  if(!currentUser){
    return null
  }

  return {...currentUser}
}

export async function getCurrentMember(userId: string | undefined, serverId: string | undefined) {  
  if(!userId || !serverId){
    return null
  }

  const currentMember = await prisma.member.findFirst({
    where:{
        userId: userId,
        serverId: serverId
    },
    include:{
      profile:{
        include:{
          user:true
        }

      }
    }
  })

  if(!currentMember){
    return null
  }

  return {...currentMember}
}

export async function getUserImage(userId: string | undefined) {  
  if(!userId){
    return null
  }

  const userImage = await prisma.user.findUnique({
    where:{
        id: userId,
    },
    select:{
      image: true
    }
  })

  if(!userImage){
    return null
  }

  return {...userImage}
}

export async function getCurrentAccount() {
  const currentUser = await getCurrentUser();
  
  if(!currentUser){
    return null
  }

  const currentAccount = await prisma.account.findUnique({
    where:{
        userId: currentUser.id
    },
    include:{
      user:{
        select:{
          name: true,
          image: true
        }
      }
    }
  })

  if(!currentAccount){
    return null
  }

  return {...currentAccount}
}

export async function getCurrentServer(serverId: string) {
  if(!serverId){
    return null
  }

  const server = await prisma.server.findUnique({
    where:{
        id: serverId,
    }
  })

  if(!server){
    return null
  }

  return {...server}
}

export async function getServer(serverId: string, userId: string) {
  if(!serverId){
    return null
  }

  if(!userId){
    return null
  }

  const servers = await prisma.server.findUnique({
    where:{
        id: serverId,
        members:{
          some:{
            userId: userId
          }
        }
    }
  })

  if(!servers){
    return null
  }

  return {...servers}
}

export async function getServers(userId: string) {
  if(!userId){
    return null
  }

  const servers = await prisma.server.findMany({
    where:{
        members:{
          some:{
            userId: userId
          }
        }
    }
  })

  if(!servers){
    return null
  }

  return {...servers}
}

export async function getChannels(serverId: string) {
  if(!serverId){
    return null
  }

  const channels = await prisma.server.findUnique({
    where:{
        id: serverId,
    },
    include:{
      channels:{
        orderBy:{
          createdAt: "asc"
        }
      },
      members:{
        include: {
          profile: true,
        },
        orderBy:{
          role: "asc"
        },
      }
    }
  })

  if(!channels){
    return null
  }

  return {...channels}
}

export async function getChannels2(serverId: string) {
  if(!serverId){
    return null
  }

  const channels = await prisma.channel.findMany({
    where:{
        serverId: serverId,
    },
  })

  if(!channels){
    return null
  }

  return {...channels}
}



export async function getMembers(serverId: string) {
  if(!serverId){
    return null
  }

  const members = await prisma.member.findMany({
    where: {
      serverId: serverId,
    },
    select: {
      id: true,
      role: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      serverId: true,
      profile: {
        select: {
          userId: true, 
          user: {
            select: {
              name: true,
              email: true,
              image: true
            },
          },
        },
      },
    },
  });


  if(!members){
    return null
  }

  return members
}

export async function getCurrentRole(serverId: string, userId: string) {
  if(!serverId){
    return null
  }

  const members = await prisma.member.findFirst({
    where: {
      userId: userId,
      serverId: serverId,
    },
    select: {
      role: true,
    },
  });


  if(!members){
    return null
  }

  return {...members}
}