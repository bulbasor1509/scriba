import { cookies } from "next/headers";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { auth } from "@/lib/auth";

export default async function SidebarLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await auth.api.getSession({
        headers: {
            cookie:  (await cookies()).toString()
        }
    });

    return (
        <div className="w-screen h-screen">
            <Navbar session={session}/>
            <div className="flex">
                <Sidebar session={session}/>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </div>
    );
}
