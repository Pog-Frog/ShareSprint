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
    const cookies = getAuthorization(req);
    if (!cookies) throw new HttpException(401, "Authentication token missing");

    const secret = JWT_SECRET;
    try {
        const verificationResponse = verify(cookies, secret) as DataStoredInToken;
        const userId = verificationResponse._id;
        const findUser = await UserModel.findById(userId);
        if (!findUser) throw new HttpException(401, "Wrong authentication token");

        req.user = findUser;
        next();
    } catch (error) {
        throw new HttpException(401, "Wrong authentication token");
    }
}