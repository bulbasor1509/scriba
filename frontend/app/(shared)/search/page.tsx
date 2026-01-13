"use client";

import StoryCard from "@/components/StoryCard";
import Wrapper from "@/components/Wrapper";
import { Comment, Like, Prisma, Story, User } from "@/generated/prisma/client";
import { Separator } from "@radix-ui/react-separator";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type SearchResultType = Story & {
    auther: User,
    likes: Like[],
    comments: Comment[]
}

type ApiResponse = {
    results: SearchResultType[];
}

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query");
    const [stories, setStories] = useState<SearchResultType[]>([]);

    useEffect(() => {
        if (!query) return;

        const fetchStories = async () => {
            const res = await fetch(`/api/search?query=${query}`);
            const json: ApiResponse = await res.json();
            setStories(json.results);
            console.log(json.results)
        };

        fetchStories();
    }, [query]);

    return (
        <div>
            <Wrapper>
                <div className="text-xl font-semibold capitalize mb-4">
                    Searching for {query}
                </div>
                <div>
                    {stories && stories.map((story, index) => (
                        <div key={story.id} className="max-w-full">
                            <StoryCard
                                id={story.id}
                                title={story.title}
                                content={story.content}
                                createdAt={story.createdAt}
                                auther={story.auther}
                                likes={story.likes}
                                comments={story.comments}
                            />
                            {index !== stories.length - 1 && (
                                <Separator className="my-4" />
                            )}
                        </div>
                    ))}
                </div>
            </Wrapper>
        </div>
    );
};

export default SearchPage;
