export interface Comment {
    _id: string;
    body: string;
    created_at: Date;
    updated_at: Date;
    author: string; //the user who wrote the comment
    post: string; //the post on which the comment was written
}