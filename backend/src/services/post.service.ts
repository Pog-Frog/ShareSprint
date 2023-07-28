import { Service } from "typedi";
import { HttpException } from "../exceptions/httpsExceptions";
import { PostModel } from "../models/post.model";
import { CommentModel } from "../models/comment.model";
import { Post } from "../interfaces/post.interface";
import { UserModel } from "../models/user.model";

@Service()
export class PostService {
    public async findAllPosts(): Promise<Post[]> {
        const posts: Post[] = await PostModel.find().populate('author').populate('comments').populate('likes');
        return posts;
    }

    public async findPostById(postId: string): Promise<Post> {
        const findPost: Post = await PostModel.findById(postId).populate('author').populate('comments').populate('likes');
        if (!findPost) throw new HttpException(409, "Post not found");
        return findPost;
    }

    public async createPost(postData: Post): Promise<Post> {
        const createdPost: Post = await PostModel.create({ ...postData });
        if(!createdPost) throw new HttpException(409, "Post not created");

        const findUser = await UserModel.findById(postData.author);
        if(!findUser) throw new HttpException(409, "User not found");

        findUser.posts.push(createdPost);
        await findUser.save();
        return createdPost;
    }

    public async updatePost(postId: string, postData: Post): Promise<Post> {
        const findPost: Post = await this.findPostById(postId);
        if (!findPost) throw new HttpException(409, "Post not found");

        const updatedPost: Post = await PostModel.findByIdAndUpdate(postId, { ...postData }, { new: true });
        if(!updatedPost) throw new HttpException(409, "Post not updated");

        return updatedPost;
    }

    public async deletePost(postId: string): Promise<Post> {
        const findPost: Post = await this.findPostById(postId);
        if (!findPost) throw new HttpException(409, "Post not found");

        const deletedPost: Post = await PostModel.findByIdAndDelete(postId);
        if(!deletedPost) throw new HttpException(409, "Post not deleted");

        return deletedPost;
    }

    public async updatePostLikes(postId: string, postData: Post): Promise<Post> {
        const findPost: Post = await this.findPostById(postId);
        if (!findPost) throw new HttpException(409, "Post not found");

        const updatedPost: Post = await PostModel.findByIdAndUpdate(postId, postData, { new: true });
        if(!updatedPost) throw new HttpException(409, "Post not updated");

        return updatedPost;
    }

    public async createPostComment(postId: string, CommentData: Comment): Promise<Post> {
        const findPost = await PostModel.findById(postId);
        if (!findPost) throw new HttpException(409, "Post not found");

        const createdComment = await CommentModel.create({ ...CommentData });
        if(!createdComment) throw new HttpException(409, "Comment not created");

        findPost.comments.push(createdComment);
        await findPost.save();
        
        return findPost;
    }
}
