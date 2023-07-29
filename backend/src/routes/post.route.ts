import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { PostController } from "../controllers/post.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { CreatePostDto, UpdatePostDto } from "../models/dtos/post.dto";
import { CreateCommentDto } from "../models/dtos/comment.dto";

export class PostRoute implements Routes {
    public path = "/api/posts";
    public router = Router();
    public postController = new PostController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.postController.getPosts);
        this.router.get(`${this.path}/:postId`, this.postController.getPostById);
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreatePostDto), this.postController.createPost);
        this.router.put(`${this.path}/:postId`, authMiddleware, validationMiddleware(UpdatePostDto), this.postController.updatePost);
        this.router.delete(`${this.path}/:postId`, authMiddleware, this.postController.deletePost);
        this.router.post(`${this.path}/:postId/comments`, authMiddleware, validationMiddleware(CreateCommentDto), this.postController.createPostComment);
    }
}