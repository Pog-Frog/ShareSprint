import { model, Schema, Document } from 'mongoose';

const VerificationTokenSchema: Schema = new Schema({
    token: { type: String, required: true },
    email: { type: String, required: true },
}, {
    timestamps: true
});

export const VerificationTokenModel = model('VerificationToken', VerificationTokenSchema);