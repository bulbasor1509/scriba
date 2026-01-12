import { User } from "@/generated/prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type UserCardProps = {
    auther: Pick<User, "id" | "name" | "email" | "image" | "bio">;
};

const Auther = ({ auther }: UserCardProps) => {
    return (
        <div>
            {/* <div className="grid grid-cols-12 place-items-center">
                <Avatar className="w-16 h-16 col-span-1">
                    <AvatarImage src="https://avatar.vercel.sh/rauchg" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="col-span-11 place-self-start">
                    <div className="text-sm md:text-lg md:font-medium capitalize mt-4">
                        written by {auther.name}
                    </div>
                    <div className="flex gap-2 text-sm mt-2 text-gray-700">
                        <div>0 followers</div>
                        <div>0 following</div>
                    </div>
                </div>
            </div> */}
            {/* <div className="text-sm mt-2 text-gray-600">{auther.bio}</div> */}
        </div>
    );
};

export default Auther;
