import { IsString, IsNotEmpty, MinLength, IsEmail, MaxLength } from "class-validator";

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
    bio: string;

    @IsString()
    image: string;

    @IsString()
    cover_image: string;

    @IsString()
    folowers: string[];

    @IsString()
    has_notifications: boolean;

    @IsString()
    posts: string[];

    @IsString()
    comments: string[];

    @IsString()
    Notifications: string[];
}

export class LoginUserDto {
    @IsEmail()
    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
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
    password: string;

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsString()
    bio: string;

    @IsString()
    image: string;

    @IsString()
    cover_image: string;

    @IsString()
    folowers: string[];

    @IsString()
    has_notifications: boolean;

    @IsString()
    posts: string[];

    @IsString()
    comments: string[];

    @IsString()
    Notifications: string[];
}