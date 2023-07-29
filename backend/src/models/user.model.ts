import { model, Schema, Document } from 'mongoose';
import { User } from "../interfaces/user.interface";

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    bio: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    email_verified: { type: Date, required: false, default: null },
    image: { type: String, required: false },
    cover_image: { type: String, required: false },
    password: { type: String, required: true },
    folowers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    has_notifications: { type: Boolean, default: false, required: false },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
    notifications: [{ type: Schema.Types.ObjectId, ref: 'Notification' }]
}, {
    timestamps: true
});

export const UserModel = model<User & Document>('User', UserSchema);