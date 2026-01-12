"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export const toggleLike = async (storyId: string) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return { error: "Unauthenticated" };
        }

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_storyId: {
                    userId: session.user.id,
                    storyId: storyId,
                },
            },
        });

        if (existingLike) {
            await prisma.like.delete({
                where: {
                    id: existingLike.id,
                },
            });
        } else {
            await prisma.like.create({
                data: {
                    userId: session.user.id,
                    storyId: storyId,
                },
            });
        }

        revalidatePath(`/story/${storyId}`);
        return { success: true };
    } catch (error) {
        console.error("Error toggling like:", error);
        return { error: "Failed to toggle like" };
    }
};

export const postComment = async (storyId: string, content: string) => {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            return { error: "Unauthenticated" };
        }

        if (!content || content.trim().length === 0) {
            return { error: "Comment cannot be empty" };
        }

        await prisma.comment.create({
            data: {
                content: content,
                storyId: storyId,
                autherId: session.user.id,
            },
        });

        revalidatePath(`/story/${storyId}`);
        return { success: true };
    } catch (error) {
        console.error("Error posting comment:", error);
        return { error: "Failed to post comment" };
    }
};
