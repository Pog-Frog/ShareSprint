import { IsString, IsNotEmpty } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    image: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    likes: string[];

    @IsString()
    comments: string[];
}

export class UpdatePostDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    image: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    likes: string[];

    @IsString()
    comments: string[];
}
