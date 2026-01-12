import Wrapper from "@/components/Wrapper";
import { auth } from "@/lib/auth";
import { cookies, headers } from "next/headers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import StoryCard from "@/components/StoryCard";
import { Separator } from "@/components/ui/separator";

const UserStoriesPage = async () => {
    const session = await auth.api.getSession({
        headers: {
            cookie: (await cookies()).toString(),
        },
    });

    if (session === null) redirect("/");

    const stories = await prisma.story.findMany({
        where: {
            autherId: session.user.id,
        },
        include: {
            auther: true,
        },
    });

    return (
        <div>
            <Wrapper>
                <div className="text-xl font-semibold capitalize">stories</div>
                <div className="flex w-full flex-col gap-6 mt-4">
                    <Tabs defaultValue="published">
                        <TabsList className="mb-4">
                            <TabsTrigger value="published">
                                Published
                            </TabsTrigger>
                            <TabsTrigger value="draft">Draft</TabsTrigger>
                        </TabsList>
                        <TabsContent value="published">
                            {stories.map((story, index) => (
                                <div key={story.id} className="max-w-full">
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
                        </TabsContent>
                        <TabsContent value="draft">
                            <div className="flex text-muted-foreground text-sm justify-center items-center h-24">
                                No drafts are there
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </Wrapper>
        </div>
    );
};

export default UserStoriesPage;
