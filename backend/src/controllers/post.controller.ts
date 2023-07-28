import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import { PostService } from "../services/post.service";
import { Post } from "../interfaces/post.interface";
import { TokenUtils } from "../utils/token.utils";
import { HttpException } from "../exceptions/httpsExceptions";
import { Comment } from "../interfaces/comment.interface";

export class PostController {
    public post = Container.get(PostService);

    public getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const posts: Post[] = await this.post.findAllPosts();
            res.status(200).json({ data: posts, message: "getPosts" });
        } catch (error) {
            next(error);
        }
    }

    public getPostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.id;
            const post: Post = await this.post.findPostById(postId);
            res.status(200).json({ data: post, message: "getPostById" });
        } catch (error) {
            next(error);
        }
    }

    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postData: Post = req.body;
            if (!postData.author) {
                const userId = TokenUtils.getUserIDFromToken(req);
                if (!userId) throw new HttpException(409, "Invalid token");
                postData.author = userId;
            }
            const createdPost: Post = await this.post.createPost(postData);
            res.status(201).json({ data: createdPost, message: "createPost" });
        } catch (error) {
            next(error);
        }
    }

    public updatePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const postData: Post = req.body;
            const updatedPost: Post = await this.post.updatePost(postId, postData);
            res.status(200).json({ data: updatedPost, message: "updatePost" });
        } catch (error) {
            next(error);
        }
    }

    public deletePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const deletedPost: Post = await this.post.deletePost(postId);
            res.status(200).json({ data: deletedPost, message: "deletePost" });
        } catch (error) {
            next(error);
        }
    }

    public updatePostLikes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const postData: Post = req.body;
            const updatedPost: Post = await this.post.updatePostLikes(postId, postData);
            res.status(200).json({ data: updatedPost, message: "updatePostLikes" });
        } catch (error) {
            next(error);
        }
    }

    public getPostComments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const post: Post = await this.post.findPostById(postId);
            const comments = post.comments;
            res.status(200).json({ data: comments, message: "getPostComments" });
        } catch (error) {
            next(error);
        }
    }

    public createPostComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const commentData: Comment = req.body;
            if (!commentData.author) {
                const userId = TokenUtils.getUserIDFromToken(req);
                if (!userId) throw new HttpException(409, "Invalid token");
                commentData.author = userId;
            }
            const post: Post = await this.post.createPostComment(postId, commentData);
            res.status(201).json({ data: post, message: "createPostComment" });
        } catch (error) {
            next(error);
        }
    }
}