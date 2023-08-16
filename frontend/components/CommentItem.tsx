import { formatDistanceToNowStrict } from "date-fns";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import Avatar from "./Avatar";
import { User } from "@/pages/api/interfaces/user.interface";
import { UserService } from "@/pages/api/services/user.service";


interface CommentItemProps {
    data: Record<string, any>
}

const CommentItem: React.FC<CommentItemProps> = ({ data }) => {
    const router = useRouter()
    const [user, setUser] = useState<User | null>(null)

    const gotoUser = useCallback((event: any) => {
        event.preventDefault()
        router.push(`/users/${data.author}`)

    }, [data.author, router])

    const createdAt = useMemo(() => {
        if (!data.createdAt) return null

        return formatDistanceToNowStrict(new Date(data.createdAt), { addSuffix: true })
    }, [data.createdAt])

    useEffect(() => {
        UserService.getUserById(data.author).then((res) => {
            setUser(res.data)
        }
        ).catch((err) => {
            console.log(err)
        })
    }, [data.author])


    return (
        <div className="border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-900 transition">
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={data.author} />
                <div>
                    <div className="flex flex-row items-center gap-2">
                        <p className="text-white font-semibold cursor-pointer hover:underline" onClick={gotoUser}>
                            {user?.username}
                        </p>
                        <span className="text-neutral-500 cursor-pointer hover:underline hidden md:block" onClick={gotoUser}>
                            @{user?.email}
                        </span>
                        <span className="text-neutral-500 text-sm">
                            {createdAt}
                        </span>
                    </div>
                    <div className="text-white mt-1">
                        {data.body}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CommentItem