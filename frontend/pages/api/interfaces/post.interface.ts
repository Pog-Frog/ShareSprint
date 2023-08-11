import { Comment } from "./comment.interface";

export interface Post {
    _id?: string;
    body?: string;
    image?: string;
    created_at?: Date;
    updated_at?: Date;
    author?: string; //the user who wrote the post
    likes?: string[]; //list of ids of users who liked the post
    comments?: Comment[]; //list of comments on the post
}