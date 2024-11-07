import { useEffect, useState } from "react";
import qs from "query-string";
import { useSocket } from "@/app/components/SocketProvider";
import { Account, Member, Message } from "@prisma/client";

interface ChatQueryProps {
    apiUrl: string;
    paramValue: string;
}

type MessageWithMemberWithAccount = Message & {
    member: Member & {
        profile: Account &{
            user: {
                image: string,
                name: string
            }
        }
    },

}

export const useChatQuery = ({ apiUrl, paramValue }: ChatQueryProps) => {
    const { socket, isConnected } = useSocket();
    const [messages, setMessages] = useState<MessageWithMemberWithAccount[]>([]);
    const [cursor, setCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchMessages = async () => {
        if (!hasMore) return;

        setLoading(true);
        setError(null);

        try {
            const url = qs.stringifyUrl({
                url: apiUrl,
                query: {
                    cursor,
                    channelId: paramValue,
                },
            }, { skipNull: true });

            const res = await fetch(url);

            if (!res.ok) {
                console.log("Error response:", res);
                throw new Error("Error fetching messages");
            }

            const data = await res.json();

            setMessages((prevMessages) => [...prevMessages, ...data.items]); // Append new messages
            setCursor(data.nextCursor); // Update cursor for next fetch
            setHasMore(!!data.nextCursor); // Update hasMore based on nextCursor
        } catch (err: any) {
            setError(err.message); // Handle error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (socket && isConnected) {
            const messageEvent = `chat:${paramValue}:messages`;
            console.log("IS-connected:", isConnected)

            // Listen for new messages via WebSocket
            socket.on(messageEvent, (newMessage: MessageWithMemberWithAccount) => {
                console.log("MESSAGE_WEBSOCKET_SERVER: ", messageEvent)
                setMessages((prevMessages) => [newMessage ,...prevMessages]);
            });

            // Cleanup when the component unmounts or paramValue changes
            return () => {
                socket.off(messageEvent);
            };
        }
    }, [socket, isConnected]);

    return {
        messages,
        fetchMessages,
        hasMore,
        loading,
        error,
    };
};