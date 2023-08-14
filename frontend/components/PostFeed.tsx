import PostItem from "./PostItem"
import usePosts from "@/hooks/usePosts"

interface PostFeedProps {
    userId?: string
}


const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {

    const { data: posts = [] } = usePosts(userId);
    console.log(posts)


    return (
        <>
            {posts.map((post: Record<string, any>,) => (
                <PostItem userId={userId || post.author} key={post._id} data={post} />
            ))}
        </>
    )
}

export default PostFeed