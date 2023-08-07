import Image from "next/image";
import Avatar from "../Avatar";
import { useEffect, useState } from "react";
import { User } from "@/pages/api/interfaces/user.interface";
import { UserService } from "@/pages/api/services/user.service";


interface UserHeroProps {
    userId: string;
}

const UserHero: React.FC<UserHeroProps> = ({ userId }) => {
    const [user, setUser] = useState({} as User);

    useEffect(() => {
        UserService.getUserById(userId).then((res) => {
            setUser(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [setUser, userId])

    return (
        <div>
            <div className="bg-neutal-700 h-44 relative">
                {user?.coverImage ? (
                    <Image src={user.coverImage} fill objectFit="cover" alt='Cover image' style={{ objectFit: 'cover' }} />
                ) : (
                    <Image src={`/images/cover_placeholder.png`} fill objectFit="cover" alt='Cover image' style={{ objectFit: 'cover' }} />
                )}
                <div className="absolute -bottom-16 left-4">
                    <Avatar userId={userId} isLarge hasBorder />
                </div>
            </div>
        </div>
    )
}
export default UserHero