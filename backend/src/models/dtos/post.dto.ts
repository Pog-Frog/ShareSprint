import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Comment } from "../../interfaces/comment.interface";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsOptional()   
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsOptional()
    likes: string[];

    @IsString()
    @IsOptional()
    comments: Comment[];
}

export class UpdatePostDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    author: string;

    @IsString()
    @IsOptional()
    likes: string[];

    @IsString()
    @IsOptional()
    comments: Comment[];
}
