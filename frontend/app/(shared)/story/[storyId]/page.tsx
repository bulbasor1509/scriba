import Auther from "@/components/Auther";
import Wrapper from "@/components/Wrapper";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import InteractionBar from "@/components/InteractionBar";
import CommentSection from "@/components/CommentSection";

const StoryReadPage = async ({
    params,
}: {
    params: Promise<{ storyId: string }>;
}) => {
    const { storyId } = await params;
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const story = await prisma.story.findUnique({
        where: {
            id: storyId,
        },
        include: { 
            auther: true,
            _count: {
                select: {
                    likes: true,
                    comments: true,
                }
            },
            comments: {
                include: {
                    auther: true
                },
                orderBy: {
                    createdAt: 'desc'
                }
            }
         },
    });

    if (!story) redirect("/");

    let isLiked = false;
    if (session?.user) {
        const like = await prisma.like.findUnique({
            where: {
                userId_storyId: {
                    storyId: storyId,
                    userId: session.user.id
                }
            }
        });
        isLiked = !!like;
    }

    const formattedDate = story.createdAt?.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Wrapper className="space-y-4">
            <div className="capitalize text-2xl font-bold">{story.title}</div>
            <div className="text-start md:w-3/5 text-xs md:text-sm text-gray-500 mt-2 flex items-center gap-2">
                <div>{formattedDate}</div>
            </div>
            
            <InteractionBar 
                storyId={story.id} 
                likeCount={story._count.likes} 
                commentCount={story._count.comments}
                initialLiked={isLiked}
            />

            <div className="mt-6 whitespace-break-spaces">{story.content}</div>
            
            <Auther auther={story.auther}/>
            
            <CommentSection 
                storyId={story.id} 
                comments={story.comments} 
                currentUser={session?.user}
            />
        </Wrapper>
    );
};

export default StoryReadPage;
