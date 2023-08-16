import { DOMAIN } from "@/config"

export const NotificaitonEndpoint = {
    createNotification: {
        url: `${DOMAIN}/notification`,
        method: 'POST'
    },
    getNotifications: {
        url: `${DOMAIN}/notification/`,
        method: 'GET'
    },
    updateNotification: {
        url: `${DOMAIN}/notification/`, ///api/notification/:notificationId
        method: 'PUT'
    },
}