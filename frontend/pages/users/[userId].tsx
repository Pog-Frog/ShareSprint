import Header from "@/components/Header"
import { useRouter } from "next/router"
import { UserService } from "../api/services/user.service";
import { useEffect, useState } from "react";
import { User } from "../api/interfaces/user.interface";
import { ClipLoader } from "react-spinners";
import UserHero from "@/components/users/UserHero";
import UserBio from "@/components/users/UserBio";
import PostFeed from "@/components/PostFeed";
import useUser from "@/hooks/useUser";

const UserView = () => {
    const router = useRouter();
    const userId = router.query.userId;
    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(true);
    const { mutate: mutateUser } = useUser();

    useEffect(() => {
        if (userId) {
            UserService.getUserById(userId).then((res) => {
                setUser(res.data)
                setLoading(false);
                mutateUser();
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [mutateUser, userId])

    if (loading) {
        return (
            <>
                <Header showBackArrow label="User Profile" />
                <div className="flex justify-center items-center h-full">
                    <ClipLoader color="lightblue" size={80} />
                </div>
            </>
        )


    } else {
        return (
            <>
                <Header showBackArrow label={user.username} />
                <UserHero userId={userId as string} />
                <UserBio user={user} />
                <PostFeed userId={userId as string} />
            </>
        )
    }
}

export default UserView