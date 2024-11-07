import { useEffect, useState } from 'react';

export function useGetToken(room: string, name:string, channelName:string) {
  const [token, setToken] = useState('');

    useEffect(()=>{
        (async() => {
            if(!room || !name){
                console.log("MISSING NAME | ROOM")
                return;
            }
            try {
                const resp = await fetch(`/api/getParticipantToken?room=${room}&username=${name}`);
                const data = await resp.json();
                setToken(data.token);
              } catch (e) {
                console.error(e);
              }
        })
    },[])

  return{
    token
  }
}