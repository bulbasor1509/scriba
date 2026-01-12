
import { Comment, User } from "@/generated/prisma/client";
import UserAvatar from "./UserAvatar";

interface CommentItemProps {
    comment: Comment & { auther: User };
}

const CommentItem = ({ comment }: CommentItemProps) => {
    const formattedDate = new Date(comment.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <div className="flex gap-4 p-4 rounded-lg bg-gray-50/50">
            <UserAvatar username={comment.auther.name} size={8} />
            <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{comment.auther.name}</span>
                    <span className="text-xs text-muted-foreground">{formattedDate}</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                    {comment.content}
                </p>
            </div>
        </div>
    );
};

export default CommentItem;
