import Auther from "@/components/Auther";
import AutherAvatar from "@/components/Auther";
import Wrapper from "@/components/Wrapper";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const StoryReadPage = async ({
    params,
}: {
    params: Promise<{ storyId: string }>;
}) => {
    const { storyId } = await params;
    const story = await prisma.story.findUnique({
        where: {
            id: storyId,
        },
        include: { auther: true },
    });

    if (!story) redirect("/");
    const formattedDate = story.createdAt?.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    console.log(story.createdAt);

    return (
        <Wrapper className="space-y-4">
            <div className="capitalize text-2xl font-bold">{story.title}</div>
            <div className="text-start md:w-3/5 text-xs md:text-sm text-gray-500 mt-2 flex items-center gap-2">
                <div>{formattedDate}</div>
            </div>
            <div className="mt-6 whitespace-break-spaces">{story.content}</div>
            <Auther auther={story.auther}/>
        </Wrapper>
    );
};

export default StoryReadPage;
