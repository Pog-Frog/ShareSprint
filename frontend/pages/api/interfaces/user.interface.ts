export interface User {
    _id?: string;
    username?: string;
    bio?: string;
    email?: string;
    email_verified?: Date;
    image?: string;
    cover_image?: string;
    password?: string;
    created_at?: Date;
    updated_at?: Date;
    followers?: string[]; // OR their ids only
    followingCount?: number;
    has_notifications?: boolean;
    posts?: string[];
    comments?: string[];
    Notifications?: string[];
    coverImage?: string;
    profileImage?: string;
    createdAt?: Date;
    updatedAt?: Date;
}