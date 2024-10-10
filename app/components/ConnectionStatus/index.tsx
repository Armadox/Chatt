"use client"

import { useSocket } from "../SocketProvider"

export const ConnectionStatus = () => {
    const {isConnected} = useSocket();

    if(!isConnected){
        return(<div> Not Connected... </div>)
    }
    return(<div>Connected</div>)
}

export default ConnectionStatus