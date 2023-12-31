import { Service } from "typedi";
import { HttpException } from "../exceptions/httpsExceptions";
import { PostModel } from "../models/post.model";
import { CommentModel } from "../models/comment.model";
import { Comment } from "../interfaces/comment.interface";
import { Post } from "../interfaces/post.interface";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user.interface";
import { Notification } from "../interfaces/notificaiton.interface";
import { NotificationModel } from "../models/notification.model";

@Service()
export class PostService {
    public async findAllPosts(): Promise<Post[]> {
        const posts: Post[] = await PostModel.find().populate('comments').sort({createdAt: -1});
        return posts;
    }

    public async findPostById(postId: string): Promise<Post> {
        const findPost: Post = await PostModel.findById(postId).populate('comments').sort({createdAt: -1});
        
        if (!findPost) throw new HttpException(409, "Post not found");
        return findPost;
    }

    public async findPostByUser(username: string): Promise<Post[]> {
        const user: User = await UserModel.findOne({ username: username });
        if (!user) throw new HttpException(409, "User not found");

        const posts: Post[] = await PostModel.find({ author: user._id }).populate('comments').sort({createdAt: -1});

        return posts;
    }

    public async findPostByUserId(userId: string): Promise<Post[]> {
        const posts: Post[] = await PostModel.find({ author: userId }).populate('comments').sort({createdAt: -1});
        if(!posts) throw new HttpException(409, "Posts not found");
        return posts;
    }

    public async createPost(postData: Post): Promise<Post> {
        const findUser = await UserModel.findById(postData.author);
        if(!findUser) throw new HttpException(409, "User not found");

        const createdPost: Post = await PostModel.create({ ...postData });
        if(!createdPost) throw new HttpException(409, "Post not created");

        findUser.posts.push(createdPost._id);
        await findUser.save();
        return createdPost;
    }

    public async updatePost(postId: string, postData: Post, currentId: string): Promise<Post> {
        const findPost: Post = await PostModel.findById(postId);
        if (!findPost) throw new HttpException(409, "Post not found");

        if (findPost.author.toString() !== currentId) throw new HttpException(409, "Unauthorized");

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
            const user = await UserModel.findById(userId);
            
            if(findPost.author.toString() !== userId) {
                const notification: Notification = {
                    receiver: findPost.author,
                    body: `${user.username} liked your post`,
                }
                
                const newNotification = await NotificationModel.create(notification);
                if(!newNotification) throw new HttpException(409, "Notification not created");
                
                const receiver = await UserModel.findById(findPost.author);
                receiver.has_notifications = true;
                await receiver.save();
            }
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
        user.comments.push(createdComment._id);
        await user.save();
        
        return findPost.populate('comments');
    }
}
