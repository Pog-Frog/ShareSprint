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

        findUser.Notifications.push(createdNotification._id);
        await findUser.save();
        return createdNotification;
    }

    public async updateNotification(notificationId: string, notificationData: Notification, currentId: string): Promise<Notification> {
        const findNotification: Notification = await NotificationModel.findById(notificationId);
        if (!findNotification) throw new HttpException(409, "Notification not found");

        if (findNotification.receiver.toString() !== currentId) throw new HttpException(409, "Unauthorized");

        const updateNotification: Notification = await NotificationModel.findByIdAndUpdate(notificationId, { ...notificationData }, { new: true });
        if(!updateNotification) throw new HttpException(409, "Notification not updated");

        return updateNotification;
    }
}