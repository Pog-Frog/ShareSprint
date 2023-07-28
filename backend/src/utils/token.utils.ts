import { verify} from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/auth.interface";
import { Request } from "express";
import { JWT_SECRET } from "../config";

export class TokenUtils{
    static getUserIDFromToken: any;
    public async getUserIDFromToken(req: Request): Promise<string> {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = verify(token, JWT_SECRET) as DataStoredInToken;
        return decoded._id;
    }
}