import useLoginModal from "@/hooks/useLoginModal"
import { Post } from "@/pages/api/interfaces/post.interface"
import { UserService } from "@/pages/api/services/user.service"
import { User } from "@/pages/api/interfaces/user.interface"
import { useRouter } from "next/router"
import { useCallback, useEffect, useMemo, useState } from "react"
import { formatDistanceToNowStrict } from "date-fns"
import Avatar from "./Avatar"
import { AiOutlineHeart, AiOutlineMessage } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { selectAuthState } from "@/redux/reducers/auth.reducer"
import { PostService } from "@/pages/api/services/post.service"
import { showSuccess } from "@/redux/reducers/success.reducer"
import { showError } from "@/redux/reducers/error.reducer"


interface PostItemProps {
    data: Record<string, any>
    userId?: string
}

const PostItem: React.FC<PostItemProps> = ({ data, userId }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const loginModal = useLoginModal()
    const [postData, setData] = useState<Post>(data)
    const [liked, setLiked] = useState<boolean>(false)


    const [user, setUser] = useState<User | null>(null)
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const isAuthenticated = useSelector(selectAuthState);

    const gotoUser = useCallback((event: any) => {
        event.stopPropagation()
        router.push(`/users/${user?._id}`)
    }, [user?._id, router])

    const gotoPost = useCallback(() => {
        router.push(`/posts/${data._id}`)
    }, [data._id, router])

    const onLike = useCallback(async (event: any) => {
        const getLikeStatus = () => {
            if(postData.likes !== undefined && currentUser?._id !== undefined) {
                for(let i = 0; i < postData.likes.length; i++) {
                    if(postData.likes[i] === currentUser?._id) {
                        return true
                    } 
                }
            }
            return false
        }

        event.stopPropagation()

        if(!isAuthenticated) {
            loginModal.onOpen()
            return
        } else {
            if((postData.likes !== undefined)&& currentUser?._id !== undefined) {
                if(postData.likes.length == 0){
                    console.log('here')
                    dispatch(showSuccess('Post liked'));
                    setLiked(true)
                } else {
                    if(getLikeStatus()) {
                        dispatch(showSuccess('Post unliked'));
                        setLiked(false)
                    } else {
                        dispatch(showSuccess('Post liked'));
                        setLiked(true)
                    }
                }
                
            }
            await PostService.updatePostLikes(data._id).then((res) => {
                
                PostService.getPostById(data._id).then((res) => { 
                    setData(res.data)
                }).catch((err) => {
                    console.log(err)
                })
                
            }).catch((err) => {
                dispatch(showError('Something went wrong'));
            })
        }
        
    }, [currentUser?._id, data._id, dispatch, isAuthenticated, loginModal, postData.likes])

    const createdAt = useMemo(() => {
        return formatDistanceToNowStrict(new Date(data.createdAt))
    }, [data.createdAt])

    useEffect(() => {
        UserService.getUserById(userId).then((res) => {
            setUser(res.data)
        }
        ).catch((err) => {
            console.log(err)
        })
        UserService.getCurrentUser().then((res) => {
            setCurrentUser(res.data)
        }).catch((err) => {
            console.log(err)
        })

        if((postData.likes !== undefined)&& currentUser?._id !== undefined) {
            for(let i = 0; i < postData.likes.length; i++) {
                if(postData.likes[i] === currentUser?._id) {
                    setLiked(true)
                    break
                }
            }
        }
    }, [currentUser?._id, postData.likes, userId])

    return (
        <div className="border-b-[1px] border-neutral-800 p-5 hover:bg-neutral-900 transition" onClick={gotoPost}>
            <div className="flex flex-row items-start gap-3">
                <Avatar userId={userId} />
                <div>
                    <div className="flex flex-row item-center gap-2">
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
                    <div className="flex flex-row items-center mt-3 gap-10">
                        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer hover:text-sky-500 transition">
                            <AiOutlineMessage size={20}/>
                            <p>
                              {postData.comments ? (postData.comments.length) : (0)} 
                            </p>
                        </div>
                        <div className="flex flex-row items-center text-neutral-500 gap-2 cursor-pointer hover:text-red-500 transition" onClick={onLike}>
                            {
                                liked ? (
                                    <AiOutlineHeart size={20} color="red"/>
                                ) : (
                                    <AiOutlineHeart size={20}/>
                                )
                            }
                            <p>
                              {postData.likes ? (postData.likes.length) : (0)}  
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default PostItem

