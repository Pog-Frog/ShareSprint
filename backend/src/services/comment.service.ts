import { Service } from 'typedi';
import { HttpException } from '../exceptions/httpsExceptions';
import { CommentModel } from '../models/comment.model';
import { Comment } from '../interfaces/comment.interface';

@Service()
export class CommentService {
    public async findCommentById(commentId: string): Promise<Comment> {
        const findComment: Comment = await CommentModel.findById(commentId).populate('author');
        if (!findComment) throw new HttpException(409, "Comment not found");
        return findComment;
    }

    public async updateComment(commentId: string, commentData: Comment): Promise<Comment> {
        const findComment: Comment = await this.findCommentById(commentId);
        if (!findComment) throw new HttpException(409, "Comment not found");

        const updatedComment: Comment = await CommentModel.findByIdAndUpdate(commentId, { ...commentData }, { new: true });
        if(!updatedComment) throw new HttpException(409, "Comment not updated");

        return updatedComment;
    }

    public async deleteComment(commentId: string): Promise<Comment> {
        const findComment: Comment = await this.findCommentById(commentId);
        if (!findComment) throw new HttpException(409, "Comment not found");

        const deletedComment: Comment = await CommentModel.findByIdAndDelete(commentId);
        if(!deletedComment) throw new HttpException(409, "Comment not deleted");

        return deletedComment;
    }
}