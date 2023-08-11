import { Post } from "@/pages/api/interfaces/post.interface"
import { PostService } from "@/pages/api/services/post.service"
import { useEffect, useState } from "react"
import PostItem from "./PostItem"

interface PostFeedProps {
    userId?: string
}


const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
    const [posts, setPosts] = useState([] as Post[])

    useEffect(() => {
        PostService.getPosts().then((res) => {
            setPosts(res.data)
        }).catch((err) => {
            console.log(err)
        })
    }, [])


    return (
        <>
            {
                posts.map((post: Record<string, any>) => (
                    <PostItem userId={post.author} key={post._id} data={post} />
                ))
            }
        </>
    )
}

export default PostFeed