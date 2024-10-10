import qs from "query-string"
import { useInfiniteQuery } from "@tanstack/react-query"
import { useSocket } from "@/app/components/SocketProvider"

interface ChatQueryProps{
    queryKey: string;
    apiUrl: string;
    paramValue: string;
};

export const useChatQuery = ({queryKey, apiUrl, paramValue}: ChatQueryProps) => {
    const {isConnected} = useSocket();
    const fetchMessages = async ({ pageParam = null }) => {
        const url = qs.stringifyUrl({
            url: apiUrl,
            query: {
                cursor: pageParam,
                channelId: paramValue  // Use channelId instead of paramValue
            }
        }, { skipNull: true });
    
        console.log("Fetching from URL:", url);
    
        const res = await fetch(url);
    
        if (!res.ok) {
            console.log("Error response:", res);
            throw new Error("Error fetching messages");
        }
    
        return res.json();
    };

    const{
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
    } = useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: fetchMessages,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
        refetchInterval: 100,
        initialPageParam: null,
      });

      return {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        status,
        error,
      };
}