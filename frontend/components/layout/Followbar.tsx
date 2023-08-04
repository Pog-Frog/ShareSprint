import { User } from "@/pages/api/interfaces/user.interface";
import { UserService } from "@/pages/api/services/user.service";

import { useCallback, useEffect, useState } from "react";
import Avatar from "../Avatar";
import { useRouter } from "next/router";

const FollowBar = () => {
    const [users, setUsers] = useState([] as User[])

    useEffect(() => {
        UserService.getUsers().then((res) => {
            setUsers(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const router = useRouter();

    const onClick = useCallback((event: any, userId: any) => {
        event.stopPropagation();
        const url = `/users/${userId}`;
        router.push(url);
    }, [router]);



    return (
        <div className="px-6 py-4 hidden lg:block pt-9">
            <div className="bg-neutral-800 rounded-xl p-4">
                <h2 className="text-white text-xl font-semibold">Who to follow</h2>
                <div className="flex flex-col gap-6 mt-4">
                    {users.map((user) => (
                        <div key={user.email} className="flex flex-row gap-4">
                            <Avatar userId={user._id} />
                            <div className="flex flex-col" onClick={(event) => onClick(event, user._id)}>
                                <button className="text-white font-semibold text-sm">@{user.username}</button>
                                <button className="bg-primary-500 text-white rounded-md px-4 py-1 text-sm font-semibold">Follow</button>
                            </div>
                            
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default FollowBar;