import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { AuthService } from "../services/auth.service";

export class AuthController {
    public auth = Container.get(AuthService);

    public signup = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: User = req.body;
            const signUpUserData: User = await this.auth.signup(userData);
            res.status(201).json({ data: signUpUserData, message: "signup" });
        } catch (error) {
            next(error);
        }

    }

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userData: User = req.body;
            const { findUser, cookie, tokenData } = await this.auth.login(userData);
            res.setHeader("Set-Cookie", [cookie]);
            res.status(200).json({ data: findUser, message: "login" });
        } catch (error) {
            next(error);
        }
    }

    public logout = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userData: User = req.user;
            const logout_message = await this.auth.logout(userData);
            res.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
            res.status(200).json({ message: logout_message });
        } catch (error) {
            next(error);
        }
    }
}