import { verify} from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/auth.interface";
import { Request } from "express";
import { JWT_SECRET } from "../config";

export class TokenUtils{
    public static async getUserIDFromToken(req: Request): Promise<string> {
        const cookie = req.cookies["Authorization"];
        const decoded = verify(cookie, JWT_SECRET) as DataStoredInToken;
        return decoded._id;
    }
}