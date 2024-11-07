import { useEffect, useState, useCallback } from "react";

type ChatScrollProps = {
    chatRef: React.RefObject<HTMLDivElement>,
    bottomRef: React.RefObject<HTMLDivElement>,
    shouldLoadMore: boolean,
    loadMore: () => void,
    count: number,
};

export const useChatScroll = ({
    chatRef, 
    bottomRef, 
    shouldLoadMore, 
    loadMore, 
    count
}: ChatScrollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    // Scroll handler to load more when the user scrolls to the top
    const handleScroll = useCallback(() => {
        const topDiv = chatRef?.current;
        if (topDiv && topDiv.scrollTop === 0 && shouldLoadMore) {
            loadMore();
        }
    }, [shouldLoadMore, loadMore, chatRef]);

    // Attach and detach the scroll event listener
    useEffect(() => {
        const topDiv = chatRef?.current;
        if (topDiv) {
            topDiv.addEventListener("scroll", handleScroll);
        }

        return () => {
            if (topDiv) {
                topDiv.removeEventListener("scroll", handleScroll);
            }
        };
    }, [handleScroll, chatRef]);

    // Logic to handle auto-scrolling to the bottom when new messages arrive
    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef?.current;

        const shouldAutoScroll = () => {
            if (!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }

            if (!topDiv) return false;

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;
            return distanceFromBottom <= 100;  // If the user is near the bottom, auto-scroll
        };

        if (shouldAutoScroll()) {
            bottomDiv?.scrollIntoView({
                behavior: "smooth",
            });
        }
    }, [bottomRef, chatRef, count, hasInitialized]);
};
