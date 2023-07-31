import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import { CommentService } from "../services/comment.service";
import { Comment } from "../interfaces/comment.interface";
import { TokenUtils } from "../utils/token.utils";

export class CommentController {
    public comment = Container.get(CommentService);

    public getCommentById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const commentId: string = req.params.id;
            const comment: Comment = await this.comment.findCommentById(commentId);
            res.status(200).json({ data: comment, message: "getCommentById" });
        } catch (error) {
            next(error);
        }
    }

    public updateComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const commentId: string = req.params.commentId;
            const commentData: Comment = req.body;

            const currentId = await TokenUtils.getUserIDFromToken(req);

            const updatedComment: Comment = await this.comment.updateComment(commentId, commentData, currentId);
            res.status(200).json({ data: updatedComment, message: "updateComment" });
        } catch (error) {
            next(error);
        }
    }

    public deleteComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const commentId: string = req.params.commentId;
            const deletedComment: Comment = await this.comment.deleteComment(commentId);
            res.status(200).json({ data: deletedComment, message: "deleteComment" });
        } catch (error) {
            next(error);
        }
    }
}