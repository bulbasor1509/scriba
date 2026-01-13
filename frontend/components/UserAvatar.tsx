import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const UserAvatar = ({username, size}: {username: string, size?:number}) => {
    return (
        <>
            <Avatar className={clsx(size && `w-${size} h-${size}`)}>
                <AvatarImage src={`https://avatar.vercel.sh/${username}`} />
                {/* <AvatarFallback>UK</AvatarFallback> */}
            </Avatar>
        </>
    );
};

export default UserAvatar;
