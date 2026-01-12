"use server";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { signOut } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function signOutAction() {
    try {
        const signout = auth.api.signOut({
            headers: await headers(),
        });
    } catch (err) {
        return {
            message: "failled to signout",
        };
    }
    return redirect("/sign-in");
}

export async function updateProfileAction(
    id: string,
    name: string,
    bio: string
) {
    try {
        const user = await prisma.user.update({
            where: {
                id,
            },
            data: {
                name,
                bio,
            },
        });
    } catch (err) {
        return {
            message: "failed to update profile",
        };
    }
    revalidatePath(`/profile/${id}`);
}
