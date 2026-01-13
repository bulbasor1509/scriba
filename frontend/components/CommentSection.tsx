"use client";

import { Comment, User } from "@/generated/prisma/client";
import { useState, useTransition } from "react";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { postComment } from "@/actions/interaction";
import { useRouter } from "next/navigation";
import CommentItem from "./CommentItem";

interface CommentSectionProps {
    storyId: string;
    comments: (Comment & { auther: User })[];
    currentUser?: {
        id: string;
        name: string;
        image?: string | null | undefined;
    } | null;
}

const CommentSection = ({
    storyId,
    comments,
    currentUser,
}: CommentSectionProps) => {
    const [content, setContent] = useState("");
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit = () => {
        if (!content.trim()) return;

        startTransition(async () => {
            const result = await postComment(storyId, content);
            if (result.error) {
                console.error(result.error);
                // Handle error (toast)
            } else {
                setContent("");
                router.refresh();
            }
        });
    };

    return (
        <div id="comment-section" className="space-y-8 mt-10">
            <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>

            {currentUser ? (
                <div className="space-y-4">
                    <Textarea
                        placeholder="Write a thoughtful comment..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={3}
                        className="resize-none outline-none rounded-sm focus-visible:ring-0"
                    />
                    <div className="flex justify-end">
                        <Button
                            onClick={handleSubmit}
                            // disabled={isPending || !content.trim()}
                        >
                            {isPending ? "Posting..." : "Post Comment"}
                        </Button>
                    </div>
                </div>
            ) : (
                <div className="p-4 bg-gray-100 rounded-md text-center text-sm text-muted-foreground">
                    Please log in to leave a comment.
                </div>
            )}

            <div className="space-y-4">
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} />
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-8">
                        No comments yet. Be the first to share your thoughts!
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
