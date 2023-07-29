import { IsString, IsNotEmpty, IsOptional } from "class-validator";

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
    @IsOptional()
    body: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    author: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    post: string;
}