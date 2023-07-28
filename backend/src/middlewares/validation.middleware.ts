import { plainToInstance } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/httpsExceptions";


export function validationMiddleware<T>(type: any, skipMissingProperties = false): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction) => {
        const dto = plainToInstance(type, req.body);
        validateOrReject(dto, { skipMissingProperties, whitelist: true, forbidNonWhitelisted: true })
            .then(() => {
                req.body = dto;
                next();
            })
            .catch((errors: ValidationError[]) => {
                const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join('\n');
                next(new HttpException(400, message));
            }
            );
    };
}