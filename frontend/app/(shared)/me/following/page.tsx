import StoryCard from "@/components/StoryCard";
import Wrapper from "@/components/Wrapper";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Separator } from "@radix-ui/react-separator";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const FollowingPage = async () => {
    const session = await auth.api.getSession({
        headers: {
            cookie: (await cookies()).toString(),
        },
    });

    if (session === null) redirect("/");

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
        include: {
            following: {
                include: {
                    following: {
                        include: {
                            stories: {
                                include: {
                                    auther: true,
                                    likes: true,
                                    comments: true
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    if (!user) redirect("/");

    const stories = user?.following.flatMap((f) => f.following.stories);

    return (
        <div>
            <Wrapper>
                <div className="text-xl font-semibold capitalize mb-4">Following</div>
                {stories.length === 0 && (
                    <p className="text-sm text-muted-foreground flex justify-center items-center h-24">
                        No stories from people you follow yet.
                    </p>
                )}

                {stories.map((story, index) => (
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
            </Wrapper>
        </div>
    );
};

export default FollowingPage;
