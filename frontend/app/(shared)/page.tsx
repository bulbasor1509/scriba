import Navbar from "@/components/Navbar";
import StoryCard from "@/components/StoryCard";
import TopPicks from "@/components/TopPicks";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/Wrapper";
import prisma from "@/lib/prisma";
import { MessageCircle } from "lucide-react";

export default async function Home() {
    const stories = await prisma.story.findMany({
        include: {
            auther: true
        }
    });

    return (
        <div className="min-h-[calc(100vh-4rem)] grid grid-cols-1 md:grid-cols-[70%_30%]">
            <Wrapper>
                {stories.map((story, index) => (
                    <div key={story.id}>
                        <StoryCard
                            id={story.id}
                            title={story.title}
                            content={story.content}
                            createdAt={story.createdAt}
                            auther={story.auther}
                        />
                        {index !== stories.length - 1 && (
                            <Separator className="my-4" />
                        )}
                    </div>
                ))}
            </Wrapper>
            <TopPicks />
        </div>
    );
}
