import { Bookmark } from "lucide-react";
import Wrapper from "./Wrapper";
import prisma from "@/lib/prisma";
import Link from "next/link";
import UserAvatar from "./UserAvatar";

function dateFormatter(date: Date): string {
    const formattedDate = new Date(date).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    return formattedDate
}

const TopPicks = async () => {
    const stories = await prisma.story.findMany({
        include: {
            likes: true,
            auther: true,
        },
        orderBy: {
            likes: {
                _count: "desc",
            },
        },
        take: 5,
    });
    
    return (
        <div className="pt-24 hidden md:flex md:flex-col border-l border-gray-100 h-full">
            <div className="p-8 flex flex-col h-full">
                <div className="capitalize font-bold text-lg">top picks</div>
                <div className="grid grid-cols-1 gap-4 mt-4 capitalize font-semibold">
                    {stories.map((story) => (
                        <Link key={story.id} className="my-2" href={`story/${story.id}`}>
                            <div className="flex items-center gap-2 text-xs mb-2 text-gray-500 capitalize font-normal">
                                <UserAvatar
                                    username={story.auther.name}
                                    size={4}
                                />
                                <div>{story.auther.name}</div>
                            </div>
                            <div>{story.title}</div>
                            <div className="text-xs text-gray-500 font-normal">{dateFormatter(story.createdAt)}</div>
                        </Link>
                    ))}

                </div>

                <div className="mt-auto class text-sm text-gray-500">
                    Click on any story <Bookmark size={16} className="inline" />{" "}
                    to easily add it to your reading.
                </div>
            </div>
        </div>
    );
};

export default TopPicks;
