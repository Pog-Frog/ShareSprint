import { Post } from './post.interface';
import { Comment } from './comment.interface';
import { Notification } from './notificaiton.interface';

export interface User {
    _id: string;
    username: string;
    bio: string;
    email: string;
    email_verified: Date;
    image: string;
    cover_image: string;
    password: string;
    created_at: Date;
    updated_at: Date;
    folowers: User[]; // OR their ids only
    has_notifications: boolean;
    posts: Post[];
    comments: Comment[];
    Notifications: Notification[];
}