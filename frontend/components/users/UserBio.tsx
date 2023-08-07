import { User } from "@/pages/api/interfaces/user.interface";
import { UserService } from "@/pages/api/services/user.service";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import Button from "../Button";
import { useSelector } from "react-redux";
import { selectAuthState } from "@/redux/reducers/auth.reducer";
import { BiCalendar } from "react-icons/bi";
import useEditModal from "@/hooks/useEditModal";

interface UserBioProps {
    user: User;
}

const UserBio: React.FC<UserBioProps> = ({ user }) => {
    const [currentUser, setCurrentUser] = useState({} as User);
    const EditModal = useEditModal();

    const createdAt = useMemo(() => {
        if (user.createdAt) {
            return format(new Date(user.createdAt), 'MMMM dd, yyyy')
        }
    }, [user.createdAt])

    const isAuthenticated = useSelector(selectAuthState);
    const email = localStorage.getItem('email');

    useEffect(() => {
        if (isAuthenticated && email) {
            UserService.getUserByEmail(email).then((res) => {
                setCurrentUser(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }

    }, [email, isAuthenticated, setCurrentUser])


    return (
        <div className="border-b-[1px] border-neutral-800 pb-4">
            <div className="flex justify-end p-2">
                <div className="flex flex-col items-center justify-center">
                    {currentUser._id === user._id ? (
                        <Button secondary label="Edit Profile" onClick={() => { EditModal.onOpen() }} />

                    ) : (
                        <Button label="Follow" onClick={() => { }} secondary />
                    )}

                </div>
            </div>
            <div className="mt-8 px-4">
                <div className="flex flex-col">
                    <div className="text-white text-2xl font-semibold">
                        {currentUser._id === user._id ? (
                            <p className="text-white text-2xl font-semibold">
                                {user?.username} <span className="text-sm text-neutral-400">(YOU)</span>
                            </p>
                        ) : (
                            <p className="text-white text-2xl font-semibold">
                                {user?.username} <span className="text-sm text-neutral-400">{user?.email}</span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col mt-4">
                    <p className="text-white">
                        {user?.bio}
                    </p>
                    <div className="flex flex-row items-center gap-2 mt-4 text-neutral-500">
                        <BiCalendar size={24} />
                        <p>Joined {createdAt}</p>
                    </div>
                </div>
                <div className="flex flex-row items-center mt-4 gap-6">
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {user?.followers?.length}
                        </p>
                        <p className="text-neutral-500">
                            Followers
                        </p>
                    </div>
                    <div className="flex flex-row items-center gap-1">
                        <p className="text-white">
                            {user?.followingCount}
                        </p>
                        <p className="text-neutral-500">
                            Following
                        </p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default UserBio