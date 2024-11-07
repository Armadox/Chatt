import { useSocket } from "@/app/components/SocketProvider"
import { Account, Member, Message } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ChatSocketProps = {
    addKey: string,
    updateKey: string,
    queryKey: string,
}

type MessageWithMemberProfile = Message & {
    member: Member & {
        profile: Account &{
            user: {
                image: string,
                name: string
            }
        }
    },
}

export const useChatSocket = ({ addKey, updateKey, queryKey }: ChatSocketProps) => {
    const { socket } = useSocket();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (!socket) {
            return;
        }

        // Handle updated message event
        socket.on(updateKey, (message: MessageWithMemberProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return oldData; // Keep old data if no pages exist
                }

                // Update the message in the current data
                const newData = oldData.pages.map((page: any) => ({
                    ...page,
                    items: page.items.map((item: MessageWithMemberProfile) => {
                        if (item.id === message.id) {
                            return message; // Replace old message with the updated one
                        }
                        return item; // Keep unchanged messages
                    }),
                }));

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        // Handle adding new message event
        socket.on(addKey, (message: MessageWithMemberProfile) => {
            queryClient.setQueryData([queryKey], (oldData: any) => {
                if (!oldData || !oldData.pages || oldData.pages.length === 0) {
                    return {
                        pages: [{ items: [message] }], // If no data, create a new structure
                    };
                }

                const newData = [...oldData.pages];
                newData[0] = {
                    ...newData[0],
                    items: [message, ...newData[0].items], // Add new message to the start
                };

                return {
                    ...oldData,
                    pages: newData,
                };
            });
        });

        // Cleanup listeners on unmount
        return () => {
            socket.off(addKey);
            socket.off(updateKey);
        };
    }, [queryClient, addKey, queryKey, socket, updateKey]);
};
