"use client"

import { useChatQuery } from "@/hooks/use-chat-query";
import { Account, Member, Message, User } from "@prisma/client";
import { Fragment, useRef, ElementRef } from "react";
import { format } from "date-fns"
import ChattItem from "../ChattItem";
import { useChatScroll } from "@/hooks/use-chat-scroll";

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

const ChattMessages:React.FC<ChattMessagesProps> = ({
    userId,
    chatId,
    member,
    channelId,
    apiUrl,
    socketUrl,
    socketQuery,
    paramValue
}) => {
    const queryKey = `chat:${chatId}`
    const {data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error} = useChatQuery({
        queryKey,
        apiUrl,
        paramValue,
    });
    const chatRef = useRef<ElementRef<"div">>(null)
    const bottomRef = useRef<ElementRef<"div">>(null)
    useChatScroll({
        chatRef,
        bottomRef,
        loadMore: fetchNextPage,
        shouldLoadMore: !isFetchingNextPage && !!hasNextPage,
        count: data?.pages?.[0]?.items?.length ?? 0,
    })


    if(status === "pending"){
        return(
        <div className="flex flex-col flex-1 justify-center items-center">
            <div className="h-10 w-10">Loading</div>
        </div>
        )
    }

    if(status === "error"){
        return(
        <div className="flex flex-col flex-1 justify-center items-center">
            <div className="h-10 w-10">Error</div>
        </div>
        )
    }    

    return ( 
    <div ref={chatRef} className="flex flex-grow flex-col py-4 h-10 overflow-y-auto">
        <div className="flex flex-col-reverse">
            {data?.pages?.map((group, i) => (
                <Fragment key={i}>
                    {group.items.map((message: MessageWithMemberWithAccount) => (
                        <div key={message.id}>
                            <ChattItem 
                            key={message.id}
                            id={message.id}
                            name={message.member.profile.user.name}
                            image={message.member.profile.user.image}
                            content={message.content}
                            member={message.member}
                            timestamp={format(new Date(message.createdAt), DATE_FORMAT)}
                            deleted={message.deleted}
                            currentMember={member}
                            isUpdated={message.updatedAt !== message.createdAt}
                            socketUrl={socketUrl}
                            socketQuery={socketQuery}/>
                        </div>
                    ))}
                </Fragment>
            ))}
            {!hasNextPage && <div className="flex-1"></div>}
            {!hasNextPage && <div className="flex items-center justify-center"><div>- Start of channel -</div></div>}
            {hasNextPage && (
            <div className="flex justify-center">
                {isFetchingNextPage ? (
                    <span>Loading...</span>
                ) : (
                    <button onClick={() => fetchNextPage()} 
                    className="text-zinc-500 h-6 hover:text-zinc-600 text-sm my-4 transition">
                        Load Previous messages
                    </button>
                )}
            </div>
        )}
        <div ref={bottomRef}/>
        </div>
    </div> 
    );
}
 
export default ChattMessages;