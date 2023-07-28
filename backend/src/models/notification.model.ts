import {model , Schema, Document} from 'mongoose';
import { Notification } from '../interfaces/notificaiton.interface';

const NotificationSchema: Schema = new Schema({
    body: { type: String, required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: Boolean, required: true , default: false} //true if the notification is read
}, {
    timestamps: true
});

export const NotificationModel =  model<Notification & Document>('Notification', NotificationSchema);