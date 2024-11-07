"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

type SocketContextType = {
    socket: Socket | null;
    isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    
    useEffect(() => {
        const socket = io('http://localhost:3000', { path: '/api/socket/io' });

        socket.on("connect", () => {
            setIsConnected(true);
        });

        socket.on("disconnect", () => {
            setIsConnected(false);
        });

        setSocket(socket);

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <>
        {isConnected ? (
        <SocketContext.Provider value={{socket, isConnected}}>
            {children}
        </SocketContext.Provider>) : (
            <div>connecting...</div>
        )}
        </>
    );

}