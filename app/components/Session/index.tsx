"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface SessionProps{
    children: ReactNode
}

const Session:React.FC<SessionProps> = ({children}) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
}
 
export default Session;