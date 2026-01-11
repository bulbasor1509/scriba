import Navbar from "@/components/Navbar";
import StoryCard from "@/components/StoryCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Wrapper from "@/components/Wrapper";
import prisma from "@/lib/prisma";
import { MessageCircle } from "lucide-react";

export default async function Home() {
    const stories = await prisma.story.findMany({});

    return (
        <Wrapper>
            {stories.map((story, index) => (
                <div key={story.id}>
                    <StoryCard
                        id={story.id}
                        title={story.title}
                        content={story.content}
                        createdAt={story.createdAt}
                    />
                    {index !== stories.length - 1 && (
                            <Separator className="my-4" />
                    )}
                </div>
            ))}
        </Wrapper>
    );
}
