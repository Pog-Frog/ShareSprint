export interface Notification {
    _id: string;
    body: string;
    receiver: string;
    status: boolean; //true if the notification is read
    created_at: Date;
    updated_at: Date;
}
