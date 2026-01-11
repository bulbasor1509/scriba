import { User } from "@/generated/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserCardProps = {
    auther: Pick<User, "id" | "name" | "email" | "image" | "bio">;
};

const Auther = ({ auther }: UserCardProps) => {
    return (
        <div className="flex items-center justify-between">
            <div>
                <Avatar>
                    <AvatarImage
                        src="https://avatar.vercel.sh/rauchg"
                        sizes={"size-14"}
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="text-sm md:text-xl md:font-medium capitalize mt-4">
                    written by {auther.name}
                </div>
                <div className="text-sm mt-2 text-gray-700">
                    <div>0 followers</div>
                    <div>0 following</div>
                </div>
                <div className="text-sm mt-2 text-gray-600">{auther.bio}</div>
            </div>
        </div>
    );
};

export default Auther;
