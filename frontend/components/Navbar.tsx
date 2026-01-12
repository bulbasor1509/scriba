"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
    BadgeQuestionMark,
    Bell,
    LogOutIcon,
    PanelLeft,
    Search,
    Settings,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    NavigationMenu,
    navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@radix-ui/react-navigation-menu";
import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
    return (
        <>
            <NavigationMenu className="z-100 h-16 flex-1 justify-between min-w-full px-4 border-b border-gray-100">
                <div className="flex items-center gap-2 font-semibold uppercase">
                <SidebarTrigger size="icon-lg"/>
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
                        <Avatar>
                            <AvatarImage src="https://avatar.vercel.sh/rauchg" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </>
        // <header className="sticky top-0 z-100 h-16 w-full border-b bg-background">
        //     <div className="flex h-full items-center justify-between px-6 md:px-8">
        //         {/* Left */}
        //         <div className="flex items-center gap-4 font-semibold uppercase">
        //             <button

        //                 aria-label="Toggle sidebar"
        //                 className="rounded-md p-2 hover:bg-gray-100 transition"
        //             >
        //                 <PanelLeft size={22} strokeWidth={1.8} />
        //             </button>
        //             scriba
        //         </div>

        //         {/* Right */}
        //         <div className="flex items-center gap-6">
        //             <Link href="/new-story" className="text-sm capitalize">
        //                 write
        //             </Link>

        //             <Search
        //                 size={18}
        //                 strokeWidth={1.8}
        //                 className="cursor-pointer"
        //             />
        //             <Bell
        //                 size={18}
        //                 strokeWidth={1.8}
        //                 className="cursor-pointer"
        //             />

        //             <DropdownMenu>
        //                 <DropdownMenuTrigger asChild>
        //                     <Avatar>
        //                         <AvatarImage src="https://avatar.vercel.sh/rauchg" />
        //                         <AvatarFallback>CN</AvatarFallback>
        //                     </Avatar>
        //                 </DropdownMenuTrigger>
        //                 <DropdownMenuContent
        //                     className="rounded-sm p-4"
        //                     sideOffset={10}
        //                     collisionPadding={48}
        //                 >
        //                     <DropdownMenuItem className="flex items-center gap-2 my-2">
        //                         <Avatar>
        //                             <AvatarImage src="https://avatar.vercel.sh/rauchg" />
        //                             <AvatarFallback>CN</AvatarFallback>
        //                         </Avatar>
        //                         <div>
        //                             <div className="capitalize">
        //                                 prathamesh khochade
        //                             </div>
        //                             <div className="text-xs capitalize text-gray-600">
        //                                 view profile
        //                             </div>
        //                         </div>
        //                     </DropdownMenuItem>
        //                     <DropdownMenuItem className="flex items-center gap-2 capitalize">
        //                         <Settings className="w-4 h-4" /> settings
        //                     </DropdownMenuItem>
        //                     <DropdownMenuItem className="flex items-center gap-2 capitalize">
        //                         <BadgeQuestionMark className="w-4 h-4" /> help
        //                     </DropdownMenuItem>
        //                     <DropdownMenuSeparator />
        //                     <DropdownMenuItem className="flex items-center gap-2 capitalize">
        //                         <LogOutIcon className="w-4 h-4" /> logout
        //                     </DropdownMenuItem>
        //                 </DropdownMenuContent>
        //             </DropdownMenu>
        //         </div>
        //     </div>
        // </header>
    );
};

export default Navbar;
