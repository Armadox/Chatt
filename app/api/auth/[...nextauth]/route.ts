import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google"
import prisma from "@/lib/prisma";

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          })
    ],
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET
    
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST}

