import { IsString, IsNotEmpty } from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    post: string;
}

export class UpdateCommentDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsString()
    @IsNotEmpty()
    post: string;
}