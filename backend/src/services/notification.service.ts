import { Service } from "typedi";
import { HttpException } from "../exceptions/httpsExceptions";
import { NotificationModel } from "../models/notification.model";
import { Notification } from "../interfaces/notificaiton.interface";
import { UserModel } from "../models/user.model";

@Service()
export class NotificationService {
    public async addNotification(UserID: String, notificationData: Notification): Promise<Notification> {
        const createdNotification: Notification = await NotificationModel.create({ ...notificationData });
        if(!createdNotification) throw new HttpException(409, "Notification not created");

        const findUser = await UserModel.findById(UserID);
        if(!findUser) throw new HttpException(409, "User not found");

        findUser.Notifications.push(createdNotification);
        await findUser.save();
        return createdNotification;
    }

    public async updateNotification(notificationId: string, notificationData: Notification): Promise<Notification> {
        const findNotification: Notification = await NotificationModel.findById(notificationId);
        if (!findNotification) throw new HttpException(409, "Notification not found");

        const updateNotification: Notification = await NotificationModel.findByIdAndUpdate(notificationId, { ...notificationData }, { new: true });
        if(!updateNotification) throw new HttpException(409, "Notification not updated");

        return updateNotification;
    }
}