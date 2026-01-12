import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query")?.trim();
    const results = await prisma.story.findMany({
        where: {
            OR: [
                {
                    title: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
                {
                    content: {
                        contains: query,
                        mode: "insensitive",
                    },
                },
            ],
        },
        include: {
            auther: true
        },
        take: 5,
        orderBy: {
            createdAt: "desc"
        }
    });

    return NextResponse.json({
        results
    })
}
