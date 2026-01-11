import { Story } from "@/generated/prisma/client";
import Link from "next/link";
import { Button } from "./ui/button";
import { Heart, MessageCircle } from "lucide-react";

type StoryCardProps = Pick<Story, "id" | "title" | "content" | "createdAt">;

const StoryCard = ({ id, title, content, createdAt }: StoryCardProps) => {
    const formattedDate = createdAt.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return (
        <Link href={`/story/${id}`}>
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
