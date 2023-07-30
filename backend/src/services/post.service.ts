import { Service } from "typedi";
import { HttpException } from "../exceptions/httpsExceptions";
import { PostModel } from "../models/post.model";
import { CommentModel } from "../models/comment.model";
import { Comment } from "../interfaces/comment.interface";
import { Post } from "../interfaces/post.interface";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user.interface";

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

    public async findPostByUser(username: string): Promise<Post[]> {
        const user: User = await UserModel.findOne({ username: username }).populate('posts');
        if (!user) throw new HttpException(409, "User not found");

        const posts: Post[] = user.posts;

        return posts;
    }

    public async createPost(postData: Post): Promise<Post> {
        const findUser = await UserModel.findById(postData.author);
        if(!findUser) throw new HttpException(409, "User not found");

        const createdPost: Post = await PostModel.create({ ...postData });
        if(!createdPost) throw new HttpException(409, "Post not created");

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

    public async deletePost(postId: string) {
        const findPost: Post = await this.findPostById(postId);
        if (!findPost) throw new HttpException(409, "Post not found");

        const deletedPost: Post = await PostModel.findByIdAndDelete(postId);
        if(!deletedPost) throw new HttpException(409, "Post not deleted");

        return "post deleted";
    }

    public async updatePostLikes(postId: string, userId: string){
        const findPost = await PostModel.findById(postId);
        if (!findPost) throw new HttpException(409, "Post not found");

        if(findPost.likes.includes(userId)) {
            if(findPost.likes.length > 0) {
                const index = findPost.likes.indexOf(userId);
                findPost.likes.splice(index, 1);
            }else{
                findPost.likes = [];
            }
        } else {
            findPost.likes.push(userId);
        }
        findPost.save();

        return "post likes updated";
    }

    public async createPostComment(postId: string, userId: string, CommentData: Comment): Promise<Post> {
        const findPost = await PostModel.findById(postId);
        if (!findPost) throw new HttpException(409, "Post not found");

        const createdComment = await CommentModel.create({ ...CommentData });
        if(!createdComment) throw new HttpException(409, "Comment not created");

        findPost.comments.push(createdComment);
        await findPost.save();

        const user = await UserModel.findById(userId);
        user.comments.push(createdComment);
        await user.save();
        
        return findPost.populate('comments');
    }
}
