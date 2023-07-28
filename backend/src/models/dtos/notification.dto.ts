import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateNotificationDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsNotEmpty()
    receiver: string;

    @IsBoolean()
    status: boolean;
}

export class UpdateNotificationDto {
    @IsString()
    @IsNotEmpty()
    body: string;

    @IsString()
    @IsNotEmpty()
    receiver: string;

    @IsBoolean()
    @IsNotEmpty()
    status: boolean;
}