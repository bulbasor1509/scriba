"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleLike } from "@/actions/interaction";
import { useRouter } from "next/navigation";

interface InteractionBarProps {
    storyId: string;
    likeCount: number;
    commentCount: number;
    initialLiked: boolean;
}

const InteractionBar = ({
    storyId,
    likeCount: initialLikeCount,
    commentCount,
    initialLiked,
}: InteractionBarProps) => {
    const [liked, setLiked] = useState(initialLiked);
    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleLike = () => {
        const newLikedState = !liked;
        // Optimistic update
        setLiked(newLikedState);
        setLikeCount((prev) => (newLikedState ? prev + 1 : prev - 1));

        startTransition(async () => {
            const result = await toggleLike(storyId);
            if (result.error) {
                // Revert on error
                setLiked(!newLikedState);
                setLikeCount((prev) => (!newLikedState ? prev + 1 : prev - 1));
                // Ideally show toast here
                console.error(result.error);
            } else {
                router.refresh();
            }
        });
    };

    const scrollToComments = () => {
        const commentSection = document.getElementById("comment-section");
        if (commentSection) {
            commentSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <div className="flex items-center gap-4 py-4 border-y border-gray-100 my-6">
            <Button
                variant="ghost"
                size="sm"
                className={cn(
                    "flex items-center gap-2",
                    liked && "text-black"
                )}
                onClick={handleLike}
                disabled={isPending}
            >
                <Heart
                    size={20}
                    className={cn(liked && "fill-current")}
                />
                <span>{likeCount}</span>
            </Button>

            <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2 text-black"
                onClick={scrollToComments}
            >
                <MessageCircle size={20} />
                <span>{commentCount}</span>
            </Button>
        </div>
    );
};

export default InteractionBar;
