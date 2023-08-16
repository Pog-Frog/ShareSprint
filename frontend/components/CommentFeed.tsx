import { Comment } from "@/pages/api/interfaces/comment.interface"
import CommentItem from "./CommentItem"


interface CommentFeedProps {
    comments: Comment[]
}

const CommentFeed: React.FC<CommentFeedProps> = ({ comments }) => {

    comments.sort((a, b) => { // for descending order sorting
        if (!(a.createdAt === undefined || b.createdAt === undefined) && a.createdAt > b.createdAt) return -1;
        if (!(a.createdAt === undefined || b.createdAt === undefined) && a.createdAt < b.createdAt) return 1;
        return 0;
    })


    return (
        <>
            {comments.map((comment) => (
                <CommentItem key={comment._id} data={comment} />
            ))}
        </>
    )
}

export default CommentFeed;