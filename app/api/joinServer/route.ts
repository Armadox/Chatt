import { NextApiRequest, NextApiResponse } from 'next';
import prisma from "@/lib/prisma";



export async function POST(request: Request){
    const body = await request.json();
    const { inviteCode, userId } = body;

    if (!inviteCode || !userId) {
        return new Response(JSON.stringify({ error: 'Invite code or user ID missing' }), { status: 400 });
      }

    const joinedCheck = await prisma.server.findFirst({
        where: {
          inviteCode: inviteCode,
          members: {
            some: {
              userId: userId,
            },
          },
        },
    });

    if (joinedCheck) {
        return new Response(JSON.stringify({ error: 'User already joined' }), { status: 400 });
    }

    const server = await prisma.server.update({
        where: {
          inviteCode: inviteCode,
        },
        data: {
          members: {
            create: [
              {
                userId: userId,
              },
            ],
          },
        },
      });

      if (server) {
        return new Response(JSON.stringify({ success: true, serverId: server.id }), { status: 200 });
      } else {
        return new Response(JSON.stringify({ error: 'Failed to join server' }), { status: 500 });
      }
}
  