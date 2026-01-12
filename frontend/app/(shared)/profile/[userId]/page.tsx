import ProfileForm from "@/components/ProfileForm";
import Wrapper from "@/components/Wrapper";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

const UserProfilePage = async ({params}: {params: Promise<{userId: string}>}) => {
    const {userId} = await params;
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })

    if(!user) redirect("/")
    return (
        <div>
            <Wrapper>
                <div className="text-xl font-semibold capitalize mb-4">User Profile</div>
                <ProfileForm user={user}/>
            </Wrapper>
        </div>
    )
}

export default UserProfilePage