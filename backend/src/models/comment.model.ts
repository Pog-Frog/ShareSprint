import { Comment } from "../interfaces/comment.interface";
import { model, Schema, Document } from 'mongoose';

const CommentSchema: Schema = new Schema({
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, {
    timestamps: true
});

export const CommentModel =  model<Comment & Document>('Comment', CommentSchema);