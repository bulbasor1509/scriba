import { Story, User } from "@/generated/prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";
import UserAvatar from "./UserAvatar";

type StoryCardProps = Pick<Story, "id" | "title" | "content" | "createdAt"> & {
    auther: User
};

const StoryCard = ({ id, title, content, createdAt, auther }: StoryCardProps) => {
    const formattedDate = createdAt.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <Link href={`/story/${id}`}>
            <div className="flex items-center gap-2 text-xs mb-2 text-gray-500">
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
                            <span>10K</span>
                        </Button>
                        <Button variant="ghost">
                            <MessageCircle size={16} />
                            <span>101</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default StoryCard;
