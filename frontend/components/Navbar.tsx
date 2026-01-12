"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    BadgeQuestionMark,
    Bell,
    LogOutIcon,
    Search,
    Settings,
    X,
} from "lucide-react";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { SidebarTrigger } from "./ui/sidebar";
import UserAvatar from "./UserAvatar";
import { auth } from "@/lib/auth";
import { sessionType } from "@/types/user";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "better-auth/api";
import { signOutAction } from "@/actions/user";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";

const Navbar = ({ session }: { session: sessionType }) => {
    const user = session?.user;
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const pathName = usePathname();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!searchOpen) return;

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        if (!searchQuery.trim()) return;

        debounceRef.current = setTimeout(() => {
            router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
        }, 400); // ⏱ debounce delay

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [searchQuery, searchOpen]);
    return (
        <>
            <div className="">
                {searchOpen ? (
                    <NavigationMenu className="z-200 h-16 flex-1 justify-between min-w-full border-b border-gray-100 bg-white">
                        <Input
                            className="w-full h-full outline-none border-none shadow-none focus-visible:ring-0"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <X
                            className="mr-4"
                            onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                                router.back(); // return to page where search started
                            }}
                        />
                    </NavigationMenu>
                ) : (
                    <NavigationMenu className="z-100 h-16 flex-1 justify-between min-w-full px-4 border-b border-gray-100">
                        <div className="flex items-center gap-2 font-semibold uppercase">
                            <SidebarTrigger size="icon-lg" />
                            scriba
                        </div>
                        <NavigationMenuList className="flex items-center gap-6 flex-wrap">
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    asChild
                                    className={navigationMenuTriggerStyle()}
                                >
                                    <Link href="/new-story">write</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Search
                                    size={18}
                                    strokeWidth={1.8}
                                    className="cursor-pointer"
                                    onClick={() => setSearchOpen(true)}
                                />
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Bell
                                    size={18}
                                    strokeWidth={1.8}
                                    className="cursor-pointer"
                                />
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                {user ? (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Avatar>
                                                <UserAvatar
                                                    username={user.name ?? ""}
                                                />
                                            </Avatar>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent
                                            className="rounded-sm p-4 bg-white"
                                            sideOffset={18}
                                            collisionPadding={20}
                                        >
                                            <DropdownMenuItem className="flex items-center gap-2 my-2">
                                                <Avatar>
                                                    <AvatarImage src="https://avatar.vercel.sh/rauchg" />
                                                    <AvatarFallback>
                                                        CN
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="capitalize">
                                                        prathamesh khochade
                                                    </div>
                                                    <div className="text-xs capitalize text-gray-600">
                                                        view profile
                                                    </div>
                                                </div>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center gap-2 capitalize">
                                                <Settings className="w-4 h-4" />{" "}
                                                settings
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className="flex items-center gap-2 capitalize">
                                                <BadgeQuestionMark className="w-4 h-4" />{" "}
                                                help
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="flex items-center gap-2 capitalize"
                                                onClick={() => signOutAction()}
                                            >
                                                <LogOutIcon className="w-4 h-4" />{" "}
                                                logout
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) : (
                                    <NavigationMenuLink
                                        asChild
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        <Link
                                            href="/sign-in"
                                            className="capitalize"
                                        >
                                            sign in
                                        </Link>
                                    </NavigationMenuLink>
                                )}
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                )}
            </div>
        </>
    );
};

export default Navbar;
