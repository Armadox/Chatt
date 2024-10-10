'use client'

import Brushed from "../Brushed"
import { signIn, signOut, useSession } from "next-auth/react"
import Button from "../Button";
import { User } from "@prisma/client";

interface SignInProps{
    currentUser: User | null
}

const SignIn:React.FC<SignInProps> = ({currentUser}) => {
    const {data: session, status} = useSession();

    if(status === "loading"){
        return(<>loading</>)
    }

    if(session && session.user){
        return(
            <div className={"hover:invert cursor-pointer"} onClick={() => signOut()}>
            <Brushed brush={"1"}>
                <span>{session.user.name}</span>
                <span>LOG OUT</span>
            </Brushed>
            </div>
        )
    }

    return(
        <div className={"hover:invert cursor-pointer"}>
        <Brushed brush={"1"}>
            <span className="text-blue-400">G</span><span className="text-red-400">o</span>
            <span className="text-yellow-400">o</span><span className="text-blue-400">g</span>
            <span className="text-green-400">l</span><span className="text-red-400">e </span>
            LogIn
        </Brushed>
        <Button label={"LOG IN HERE"} style={0} onClick={() => signIn()}/>
        </div>
    )
}

export default SignIn