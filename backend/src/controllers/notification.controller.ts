import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import { RequestWithUser } from "../interfaces/auth.interface";
import { Notification } from "../interfaces/notificaiton.interface";
import { NotificationService } from "../services/notification.service";

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

    public updateNotification = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const notificationId: string = req.params.notificationId;
            const notificationData: Notification = req.body;
            const updatedNotification: Notification = await this.notification.updateNotification(notificationId, notificationData);
            res.status(200).json({ data: updatedNotification, message: "updateNotification" });
        } catch (error) {
            next(error);
        }
    }
}
