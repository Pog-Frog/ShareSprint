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

//for the login and signup routes
export const alreadyAuthorizedMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const AUTHORIZATION = getAuthorization(req);

        if (AUTHORIZATION) {
            const { _id } = await (verify(AUTHORIZATION, JWT_SECRET)) as DataStoredInToken;
            const findUser = await UserModel.findById(_id);
            if (findUser) {
                next(new HttpException(401, 'You are already logged in'));
            } else {
                next();
            }
        } else {
            next();
        }
    } catch (error) {
        next();
    }
}