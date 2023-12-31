import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import { RequestWithUser } from "../interfaces/auth.interface";
import { Notification } from "../interfaces/notificaiton.interface";
import { NotificationService } from "../services/notification.service";
import { TokenUtils } from "../utils/token.utils";

export class NotificationController {
    public notification = Container.get(NotificationService);

    public addNotification = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const notificationData: Notification = req.body;
            const newNotification: Notification = await this.notification.addNotification(notificationData);
            res.status(201).json({ data: newNotification, message: "addNotification" });
        } catch (error) {
            next(error);
        }
    }

    public getNotifications = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const currentId = await TokenUtils.getUserIDFromToken(req);
            const notifications: Notification[] = await this.notification.getNotifications(currentId);
            res.status(200).json({ data: notifications, message: "getNotifications" });
        } catch (error) {
            next(error);
        }
    }
}
