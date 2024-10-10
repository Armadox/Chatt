"use client"

import { Account } from "@prisma/client";
import { ChangeEvent, useRef, useState } from "react";
import Brushed from "../Brushed";

interface ServerCreatorProps{
    account: Account | null
}

const JoinGroup:React.FC<ServerCreatorProps> = ({account}) => {
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");

    
    if(!account){
        return(<>...Loading</>)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        try {
          const response = await fetch("/api/joinServer", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              inviteCode: code,
              userId: account.userId,
            }),
          });
    
          const data = await response.json();
          if (data.success) {
            // Redirect to the server page
            window.location.href = `/servers/${data.serverId}`;
          } else {
            setMessage(data.error || "Failed to join server");
          }
        } catch (err) {
          console.error("Error:", err);
          setMessage("An error occurred. Please try again.");
        }
      };
    
    
      return (
        <div className="min-w-[18rem] max-w-[24rem]">
          <Brushed brush={"1"}>
          <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="mb-4 text-black"
              />
              <Brushed brush={"2"}><button type="submit">Join Server</button></Brushed>
            </form>
          </Brushed>
          {message && <p>{message}</p>}
        </div>
      );
    
}
 
export default JoinGroup;