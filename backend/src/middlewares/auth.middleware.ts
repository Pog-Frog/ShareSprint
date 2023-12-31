import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import { DataStoredInToken, RequestWithUser } from "../interfaces/auth.interface";
import { HttpException } from "../exceptions/httpsExceptions";
import { UserModel } from "../models/user.model";

const getAuthorization = (req: { cookies: { [x: string]: any; }; headers: { [x: string]: any; }; }) => {
    const cookies = req.cookies["Authorization"];
    if (cookies) return cookies;

    const headers = req.headers["authorization"];
    if (headers) return headers.split('Bearer ')[1];

    return null;
}

export const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const AUTHORIZATION = getAuthorization(req);

        if (AUTHORIZATION) {
            const { _id } = await (verify(AUTHORIZATION, JWT_SECRET)) as DataStoredInToken;
            const findUser = await UserModel.findById(_id);
            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, 'Invalid authentication token'));
            }
        } else {
            next(new HttpException(401, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Invalid authentication token'));
    }
}