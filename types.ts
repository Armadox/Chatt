import {Server as NetServer, Socket} from "net"
import { NextApiRequest, NextApiResponse } from "next"
import {Server as SocketIoServer} from "socket.io"
import {Server, Member, Account} from "@prisma/client"

export type NextApiResponseServerIo = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIoServer
        }
    }
}