import { Network } from "@/pages/api/network";
import { Notification } from "../interfaces/notificaiton.interface";
import { NotificaitonEndpoint } from "../endpoints/notificaiton.endpoint";

export class NotificationService {
    static async createNotification(notification: Notification) {
        return Network.fetch(NotificaitonEndpoint.createNotification.url, {
            method: NotificaitonEndpoint.createNotification.method,
            body: JSON.stringify(notification)
        }, true);
    }

    static async getNotifications() {
        return Network.fetch(NotificaitonEndpoint.getNotifications.url, {
            method: NotificaitonEndpoint.getNotifications.method
        }, true);
    }

    static async updateNotification(notificationId: string, notification: Notification) {
        return Network.fetch(NotificaitonEndpoint.updateNotification.url + notificationId, {
            method: NotificaitonEndpoint.updateNotification.method,
            body: JSON.stringify(notification)
        }, true);
    }
}
