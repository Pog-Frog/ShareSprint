import { COMPANY_NAME } from "@/config"
import useLoginModal from "@/hooks/useLoginModal"
import useRegisterModal from "@/hooks/useRegisterModal"
import { Post } from "@/pages/api/interfaces/post.interface"
import { PostService } from "@/pages/api/services/post.service"
import { UserService } from "@/pages/api/services/user.service"
import { showError } from "@/redux/reducers/error.reducer"
import { showSuccess } from "@/redux/reducers/success.reducer"
import { User } from "@/pages/api/interfaces/user.interface"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Button from "./Button"
import { selectAuthState } from "@/redux/reducers/auth.reducer"
import Avatar from "./Avatar"
import usePosts from "@/hooks/usePosts"
import usePost from "@/hooks/usePost"
import { Comment } from "@/pages/api/interfaces/comment.interface"

interface FormProps {
    placeholder: string,
    isComment?: boolean,
    postId?: string;
}


const Form: React.FC<FormProps> = ({ placeholder, isComment, postId }) => {
    const registerModal = useRegisterModal()
    const loginModal = useLoginModal()
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    const isAuthenticated = useSelector(selectAuthState);
    const { mutate: mutatePosts } = usePosts();
    const { mutate: mutatePost } = usePost(postId as string);

    const [body, setBody] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch();


    const onSubmit = useCallback(async () => {
        if (!isComment) {
            try {
                const Post: Post = {
                    body: body,
                    author: currentUser?._id
                }
                setIsLoading(true)
                await PostService.createPost(Post).then((res) => {
                    dispatch(showSuccess('Post created successfully'));
                }).catch((err) => {
                    dispatch(showError('Something went wrong'));
                })
                setBody("")
                mutatePosts()
            } catch (err) {
                dispatch(showError('Something went wrong'));
            } finally {
                setIsLoading(false)
            }
        } else {
            try {
                const comment: Comment = {
                    body: body,
                    post: postId as string,
                    author: currentUser?._id
                }
                setIsLoading(true)
                await PostService.createComment(postId as string, comment).then((res) => {
                    dispatch(showSuccess('Comment created successfully'));
                }).catch((err) => {
                    dispatch(showError('Something went wrong'));
                })
                setBody("")
                mutatePost()
            } catch (error) {
                dispatch(showError('Something went wrong'));
            } finally {
                setIsLoading(false)
            }

        }
    }, [body, currentUser?._id, dispatch, isComment, mutatePost, mutatePosts, postId])

    useEffect(() => {
        UserService.getCurrentUser().then((res) => {
            setCurrentUser(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <div className="border-b-[1px] border-neutal-800 px-5 py-2">
            {isAuthenticated ? (
                <div>
                    <div className="flex flex-row gap-4">
                        <div>
                            <Avatar userId={currentUser?._id} />
                        </div>
                        <div className="w-full">
                            <textarea disabled={isLoading} onChange={(e) => setBody(e.target.value)}
                                value={body} className="disabled:opacity-80 peer resize-none mt-3 w-full bg-black ring-0 outline-none text-[20px] placeholder-neutral-500 text-white"
                                placeholder={placeholder}
                            >

                            </textarea>
                            <hr className="opacity-0 peer-focus:opacity-100 h-[1px] w-full border-neutral-800 transition" />
                            <div className="flex flex-row justify-end mt-4">
                                <Button label="Post" onClick={onSubmit} disabled={isLoading || !body} />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-8">
                    <h1 className="text-white text-2xl text-center mb-4 font-bold">
                        Welcome To {COMPANY_NAME}
                    </h1>
                    <div className="flex flex-row justify-center gap-4">
                        <Button label="Login" onClick={loginModal.onOpen} />
                        <Button label="Register" onClick={registerModal.onOpen} secondary />
                    </div>
                </div>
            )}
        </div>
    )
}

export default Form