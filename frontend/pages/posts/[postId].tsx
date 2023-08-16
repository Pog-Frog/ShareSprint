import { useRouter } from "next/router"
import { ClipLoader } from "react-spinners"
import Header from "@/components/Header"
import PostItem from "@/components/PostItem"
import Form from "@/components/Form"
import usePost from "@/hooks/usePost"
import CommentFeed from "@/components/CommentFeed"

const PostView = () => {

    const router = useRouter()
    const postId  = router.query.postId
    const { data: post, isLoading } = usePost(postId as string);


    if( isLoading || !post) {
        return (
            <div className="flex justify-center items-center h-full">
                <ClipLoader color="lightblue" size={80} />
            </div>
        )
    } else {
        return (
            <>
             <Header label="Post" showBackArrow/>
             <PostItem data={post} userId={post?.author}/>
             <Form postId={postId as string}
                isComment
                placeholder="Write a comment..."
             />
             <CommentFeed comments={post?.comments} /> 
            </>
        )
    }
}

export default PostView