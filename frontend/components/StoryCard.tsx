import { Comment, Like, Story, User } from "@/generated/prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import UserAvatar from "./UserAvatar";

type StoryCardProps = Pick<Story, "id" | "title" | "content" | "createdAt"> & {
    auther: User,
    likes: Like[],
    comments: Comment[]
};

const StoryCard = ({ id, title, content, createdAt, auther, likes, comments }: StoryCardProps) => {
    const formattedDate = createdAt.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <Link href={`/story/${id}`}>
            <div className="flex items-center gap-2 text-xs mb-2 text-gray-500 capitalize">
                <UserAvatar username={auther.name} size={4}/>
                <div>{auther.name}</div>
            </div>
            <div className="space-y-4">
                <div className="text-lg capitalize font-bold">{title}</div>
                <div className="space-y-2">
                    <div className="line-clamp-2 overflow-hidden overflow-ellipsis">
                        {content}
                    </div>
                    <div className="flex gap-4 items-center text-sm text-gray-500">
                        <div>{formattedDate}</div>
                        <Button variant="ghost">
                            <Heart size={16} />
                            <span>{likes.length}</span>
                        </Button>
                        <Button variant="ghost">
                            <MessageCircle size={16} />
                            <span>{comments.length}</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StoryCard;
