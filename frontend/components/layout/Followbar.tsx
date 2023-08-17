import { useCallback } from "react";
import Avatar from "../Avatar";
import { useRouter } from "next/router";;
import useUsersToFollow from "@/hooks/useUsersToFollow";
import { ClipLoader } from "react-spinners";


const FollowBar = () => {
    const { data: users, error, isLoading } = useUsersToFollow();

    const router = useRouter();

    const onClick = useCallback((event: any, userId: any) => {
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    }, [router]);

    if (isLoading || !users && !error) {
        return (
            <div className="px-6 py-4 hidden lg:block pt-9">
                <div className="bg-neutral-800 rounded-xl p-4">
                    <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                    <div className="flex flex-col gap-6 mt-4">
                        <div className='pt-5'>
                            <ClipLoader color="#ffffff" />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="px-6 py-4 hidden lg:block pt-9">
                <div className="bg-neutral-800 rounded-xl p-4">
                    <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                    <div className="flex flex-col gap-6 mt-4">
                        {users.map((user) => (
                            <div key={user.email} className="flex flex-row gap-4">
                                <Avatar userId={user._id} />
                                <div className="flex flex-row" onClick={(event) => onClick(event, user._id)}>
                                    <button className="text-white font-semibold text-sm">@{user.username}</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div >
        );
    }
}

export default FollowBar;