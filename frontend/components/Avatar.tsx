import { User } from "@/pages/api/interfaces/user.interface";
import { UserService } from "@/pages/api/services/user.service";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

interface AvatarProps {
    userId?: string;
    isLarge?: boolean;
    hasBorder?: boolean;
}

const Avatar: React.FC<AvatarProps> = ({ userId, isLarge, hasBorder }) => {
    const [user, setUser] = useState({} as User);

    const router = useRouter();

    useEffect(() => {
        if(userId){
            UserService.getUserById(userId).then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
    }, [userId])

    

    const onClick = useCallback((event: any) => {
        event.stopPropagation();

        const url = `/users/${userId}`;
        router.push(url);
    }, [router, userId]);
    
    return (
        <div className={`
            ${hasBorder ? 'border-4 border-black' : ''}
            ${isLarge ? 'h-32' : 'h-12'}
            ${isLarge ? 'w-32' : 'w-12'}
            rounded-full
            hover:opcaity-90
            relative
            cursor-pointer
        `}
        >
            {user?.profileImage ? (
                <Image fill style={{ objectFit: 'cover', borderRadius: '100%' }} src={user.profileImage} alt='Profile image' onClick={onClick} />
            ) : (
                <Image fill style={{ objectFit: 'cover', borderRadius: '100%' }} src={`/images/placeholder.png`} alt='Profile image' onClick={onClick} />
            )}
        </div>
    );
}

export default Avatar;

