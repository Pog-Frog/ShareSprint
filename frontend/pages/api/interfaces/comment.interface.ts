export interface Comment {
    _id?: string;
    body?: string;
    author?: string; //the user who wrote the comment
    post?: string; //the post on which the comment was written
    createdAt?: string;
    updatedAt?: string;
}