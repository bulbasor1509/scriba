"use client";

import { Bookmark, House, PanelLeft, TrendingUp, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const SidebarItems = [
    { name: "home", path: "/", icon: House },
    { name: "library", path: "/bookmarks", icon: Bookmark },
    { name: "profile", path: "/profile", icon: User },
    { name: "stats", path: "/stats", icon: TrendingUp },
];

export default function Sidebar({ isOpen }: { isOpen: boolean }) {
    const pathname = usePathname();

    return (
        <aside
            className={clsx(
                `
                fixed inset-y-0 left-0 z-50
                bg-white border-r
                transition-all duration-300 ease-in-out

                /* Desktop behavior */
                md:static
        `,
                // width = collapsed / expanded on desktop
                isOpen ? "md:w-64" : "md:w-16",

                // mobile slide
                isOpen ? "translate-x-0" : "-translate-x-full",

                // mobile width
                "w-64"
            )}
        >
            {/* <div className="flex items-center gap-4 font-semibold uppercase p-4">
                <button
                    // onClick={toggleSidebar}
                    aria-label="Toggle sidebar"
                    className="rounded-md p-2 hover:bg-gray-100 transition"
                >
                    <PanelLeft size={22} strokeWidth={1.8} />
                </button>
                scriba
            </div> */}
            <div className="flex flex-col gap-2 p-4">
                {SidebarItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                        <Link
                            key={item.name}
                            href={item.path}
                            className={clsx(
                                "flex items-center gap-4 rounded-lg px-3 py-2 transition-colors capitalize",
                                isActive
                                    ? "bg-gray-100 font-semibold"
                                    : "text-gray-600 hover:bg-gray-50",
                                !isOpen && "md:justify-center"
                            )}
                        >
                            <item.icon size={20} />

                            {/* hide label when collapsed on desktop */}
                            <span className={clsx(!isOpen && "md:hidden")}>
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
}
