import { IsString, IsNotEmpty, MinLength, IsEmail, MaxLength, IsOptional } from "class-validator";

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
    folowers: string[];

    @IsString()
    @IsOptional()
    has_notifications: boolean;

    @IsString()
    @IsOptional()
    posts: string[];

    @IsString()
    @IsOptional()
    comments: string[];

    @IsString()
    @IsOptional()
    Notifications: string[];
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
    folowers: string[];

    @IsString()
    @IsOptional()
    has_notifications: boolean;

    @IsString()
    @IsOptional()
    posts: string[];

    @IsString()
    @IsOptional()
    comments: string[];

    @IsString()
    @IsOptional()
    Notifications: string[];
}