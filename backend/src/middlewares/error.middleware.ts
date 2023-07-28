import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpsExceptions";

const ErrorMiddleware = (error: HttpException, request: Request, response: Response, next: NextFunction) => {
    try {
        const status = error.status || 500;
        const message = error.message || 'Something went wrong';
        response
            .status(status)
            .send({
                status,
                message,
            });
    }
    catch (e) {
        console.log(e);
        next(e)
    }
};

export default ErrorMiddleware;