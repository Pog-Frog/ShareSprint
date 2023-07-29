import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { CommentController } from '../controllers/comment.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { UpdateCommentDto } from '../models/dtos/comment.dto';

export class CommentRoute implements Routes {
    public path = '/api/comments';
    public router = Router();
    public commentController = new CommentController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:commentId`, this.commentController.getCommentById);
        this.router.put(`${this.path}/:commentId`, authMiddleware, validationMiddleware(UpdateCommentDto), this.commentController.updateComment);
        this.router.delete(`${this.path}/:commentId`, authMiddleware, this.commentController.deleteComment);
    }
}