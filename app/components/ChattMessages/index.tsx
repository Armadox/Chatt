"use client"

import { useChatQuery } from "@/hooks/use-chat-query";
import { Account, Member, Message, User } from "@prisma/client";
import { Fragment, useRef, ElementRef, useState, useEffect } from "react";
import { format } from "date-fns"
import ChattItem from "../ChattItem";

const DATE_FORMAT = "d MMM yyyy, HH:mm"

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

interface ChattMessagesProps{
    userId: string,
    chatId: string,
    member: Member,
    channelId: string,
    apiUrl: string,
    socketUrl: string,
    socketQuery: Record<string, string>,
    paramValue: string,

}

const ChattMessages = ({ channelId, apiUrl, socketUrl, socketQuery, member }: ChattMessagesProps) => {
    const [hasFetched, setHasFetched] = useState(false);
    const { messages, fetchMessages, hasMore, loading, error } = useChatQuery({
        apiUrl,
        paramValue: channelId,
    });

    if (!hasFetched && messages.length === 0) {
        fetchMessages();
        setHasFetched(true);
    }

    const handleLoadMore = () => {
        fetchMessages();
    };

    // Scroll to bottom whenever messages change
    const chatContainerRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div ref={chatContainerRef} className="flex flex-grow flex-col py-4 h-10 overflow-y-auto">
            <div className="flex flex-col-reverse">
            {loading && <p>Loading...</p>}
            {error && <p>Error loading messages: {error}</p>}
            <Fragment>
                {messages.length > 0 ? (
                    messages.map((msg) => {
                        return (
                            <div key={msg.id}>
                            <ChattItem
                                key={msg.id}
                                id={msg.id}
                                name={msg.member?.profile?.user?.name}
                                image={msg.member?.profile?.user?.image}
                                content={msg.content}
                                member={msg.member}
                                timestamp={format(new Date(msg.createdAt), DATE_FORMAT)}
                                deleted={msg.deleted}
                                currentMember={member}
                                isUpdated={msg.updatedAt !== msg.createdAt}
                                socketUrl={socketUrl}
                                socketQuery={socketQuery}
                            />
                            </div>
                        );
                    })
                ) : (
                    !loading && <div className="flex items-center justify-center text-zinc-600"><div>No messages found</div></div>
                )}
            </Fragment>
            {hasMore && !loading ? (
                <button onClick={handleLoadMore} 
                className="text-zinc-500 h-6 hover:text-zinc-600 text-sm my-4 transition">
                    Load Previous messages
                </button>
            ) : (
                <div className="flex items-center justify-center"><div>- Start of channel -</div></div>
            )}
            </div>
        </div>
    );
};

export default ChattMessages;