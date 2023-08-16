import { IsString, IsNotEmpty, MinLength, IsEmail, MaxLength, IsOptional } from "class-validator";
import { Post } from "../../interfaces/post.interface";
import { Notification } from "../../interfaces/notificaiton.interface";
import { Comment } from "../../interfaces/comment.interface";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()
    cover_image: string;

    @IsString()
    @IsOptional()
    followers: string[];

    @IsString()
    @IsOptional()
    has_notifications: boolean;

    @IsString()
    @IsOptional()
    posts: Post[];

    @IsString()
    @IsOptional()
    comments: Comment[];

    @IsString()
    @IsOptional()
    coverImage: string;

    @IsString()
    @IsOptional()
    profileImage: string;
}

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(20)
    username: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @IsOptional()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    public email: string;

    @IsString()
    @IsOptional()
    bio: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()
    cover_image: string;

    @IsString()
    @IsOptional()
    followers: string[];

    @IsString()
    @IsOptional()
    has_notifications: boolean;

    @IsString()
    @IsOptional()
    posts: Post[];

    @IsString()
    @IsOptional()
    comments: Comment[];

    @IsString()
    @IsOptional()
    coverImage: string;

    @IsString()
    @IsOptional()
    profileImage: string;
}