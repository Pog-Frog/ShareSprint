export interface Notification {
    _id: string;
    body: string;
    receiver: string;
    status: boolean; //true if the notification is read
    createdAt: Date;
    updatedAt: Date;
    new?: boolean;
}
