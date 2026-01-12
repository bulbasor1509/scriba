import { Bookmark, House, TrendingUp, User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <>
            <div className="h-full px-12 py-10 border-r border-gray-100">
                <div className="grid grid-cols-1 gap-6 place-items-start">
                    <div className="flex items-center gap-4">
                        <House size={20} />
                        <Link href={"/"}>Home</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Bookmark size={20} />
                        <Link href={"/"}>Library</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <User size={20} />
                        <Link href={"/"}>Profile</Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <TrendingUp size={20} />
                        <Link href={"/"}>Stats</Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
