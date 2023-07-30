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
            const postId: string = req.params.postId;
            const post: Post = await this.post.findPostById(postId);
            res.status(200).json({ data: post, message: "getPostById" });
        } catch (error) {
            next(error);
        }
    }

    public getPostsByUser = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const username: string = req.params.username;
            const posts: Post[] = await this.post.findPostByUser(username);

            res.status(200).json({ data: posts, message: "getPostByUser" });
        } catch (error) {
            next(error);
        }
    }

    public createPost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postData: Post = req.body;
            if (!postData.author) {
                const userId = await TokenUtils.getUserIDFromToken(req);
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
            const deletedPost = await this.post.deletePost(postId);
            res.status(200).json({ message: deletedPost });
        } catch (error) {
            next(error);
        }
    }

    public updatePostLikes = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const userId = await TokenUtils.getUserIDFromToken(req);

            if (!userId) throw new HttpException(409, "Invalid token");

            const updatedPost = await this.post.updatePostLikes(postId, userId);
            if (!updatedPost) throw new HttpException(409, "Post not found");

            res.status(200).json({ message: updatedPost });
        } catch (error) {
            next(error);
        }
    }

    public createPostComment = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const postId: string = req.params.postId;
            const commentData: Comment = req.body;
            const userId = await TokenUtils.getUserIDFromToken(req);
            if (!userId) throw new HttpException(409, "Invalid token");

            if (!commentData.author) {
                commentData.author = userId;
            }

            const post: Post = await this.post.createPostComment(postId, userId, commentData);
            res.status(201).json({ data: post, message: "createPostComment" });
        } catch (error) {
            next(error);
        }
    }
}