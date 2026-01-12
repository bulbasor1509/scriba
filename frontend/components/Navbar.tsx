import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
    BadgeQuestionMark,
    Bell,
    BellIcon,
    LogOutIcon,
    Search,
    Settings,
} from "lucide-react";
import { buttonVariants } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
    return (
        <>
            <div className="sticky top-0 left-0 w-full h-16 flex items-center justify-between border-b border-gray-100 px-12 bg-background">
                <div className="uppercase font-semibold">scriba</div>
                <div className="h-full flex items-center gap-8">
                    <Link
                        href="/"
                        className="text-sm"
                    >
                        write
                    </Link>

                    <Search size={18} strokeWidth={1.8}/>
                    <Bell size={18} strokeWidth={1.8}/>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Avatar>
                                <AvatarImage src="https://avatar.vercel.sh/rauchg" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="rounded-sm p-4"
                            sideOffset={8}
                            collisionPadding={48}
                        >
                            <DropdownMenuItem className="flex items-center gap-2 my-2">
                                <Avatar>
                                    <AvatarImage src="https://avatar.vercel.sh/rauchg" />
                                    <AvatarFallback>CN</AvatarFallback>
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
                                <Settings className="w-4 h-4" /> settings
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex items-center gap-2 capitalize">
                                <BadgeQuestionMark className="w-4 h-4" /> help
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="flex items-center gap-2 capitalize">
                                <LogOutIcon className="w-4 h-4" /> logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </>
    );
};

export default Navbar;
