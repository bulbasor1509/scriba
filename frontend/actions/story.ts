"use server"

import { auth } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { storySchema } from "@/types/story"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { request } from "node:http"
import {z} from "zod"

export default async function postStoryAction(story: z.infer<typeof storySchema>) {
    try {
        const session = await auth.api.getSession({
            headers: await headers()
        })

        if(session?.user) {
            const user = session.user
            await prisma.story.create({
                data: {
                    title: story.title,
                    content: story.content,
                    autherId: user.id
                }
            })
        }
    } catch {
        return {
            error: "fail to post story"
        }
    }
    return redirect("/");
}