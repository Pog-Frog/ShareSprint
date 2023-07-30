import { Post } from "../interfaces/post.interface";
import { model, Schema, Document } from 'mongoose';

const PostSchema: Schema = new Schema({
    body: { type: String, required: true },
    image: { type: String, required: false },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: false}],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: false }]
}, {
    timestamps: true
});

export const PostModel =  model<Post & Document>('Post', PostSchema);