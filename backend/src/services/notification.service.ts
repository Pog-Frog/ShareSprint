import { Service } from "typedi";
import { HttpException } from "../exceptions/httpsExceptions";
import { NotificationModel } from "../models/notification.model";
import { Notification } from "../interfaces/notificaiton.interface";
import { UserModel } from "../models/user.model";

@Service()
export class NotificationService {
    public async addNotification(notificationData: Notification): Promise<Notification> {
        const findUser = await UserModel.findById(notificationData.receiver);
        if(!findUser) throw new HttpException(409, "Notification receiver not found");

        const createdNotification: Notification = await NotificationModel.create({ ...notificationData });
        if(!createdNotification) throw new HttpException(409, "Notification not created");
        
        findUser.has_notifications = true;
        await findUser.save();
        return createdNotification;
    }

    public async getNotifications(userId: string): Promise<Notification[]> {
        const user = await UserModel.findById(userId);
        if(!user) throw new HttpException(409, "User not found");

        const notifications: Notification[] = await NotificationModel.find({ receiver: userId }).sort({ createdAt: -1 });
        if(!notifications) throw new HttpException(409, "Notifications not found");

        for(let i = 0; i < notifications.length; i++) {
            if(!notifications[i].status) {
                notifications[i].status = true;
                await notifications[i].save();
                notifications[i] = notifications[i].toJSON();
                notifications[i].new = true;
            }
        }

        if(user.has_notifications) {
            user.has_notifications = false;
            await user.save();
        }

        return notifications;
    }
}