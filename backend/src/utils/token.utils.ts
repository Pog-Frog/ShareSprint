import { verify} from "jsonwebtoken";
import { DataStoredInToken } from "../interfaces/auth.interface";
import { Request } from "express";
import { JWT_SECRET } from "../config";

export class TokenUtils{
    public static async getUserIDFromToken(req: Request): Promise<string> {
        let token: string;
        try{
            token = req.headers.authorization.split(" ")[1];
        }
        catch(error){
            throw new Error("No token provided");
            // return "64c804e8dc4f158dc7ecd8d1"
        }
        const decoded = verify(token, JWT_SECRET) as DataStoredInToken;
        return decoded._id;
    }
}