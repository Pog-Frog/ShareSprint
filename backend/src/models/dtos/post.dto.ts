import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsOptional()
    image: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsOptional()
    likes: string[];

    @IsString()
    @IsOptional()
    comments: string[];
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
    author: string;

    @IsString()
    @IsOptional()
    likes: string[];

    @IsString()
    @IsOptional()
    comments: string[];
}
