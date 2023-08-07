import { NextFunction, Response, Request } from "express";
import { Container } from "typedi";
import { RequestWithUser } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import { UserService } from "../services/user.service";
import { VerificationTokenModel } from "../models/verification_tokens.model";
import { UserModel } from "../models/user.model";
import { TokenUtils } from "../utils/token.utils";


export class UserController {
    public user = Container.get(UserService);

    public updateUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const userData: User = req.body;
            const currentId = await TokenUtils.getUserIDFromToken(req);

            if (currentId !== userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }
            const updatedUser: User = await this.user.updateUser(userId, userData);
            res.status(200).json({ data: updatedUser, message: "updateUser" });
        } catch (error) {
            next(error);
        }
    }

    public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const deletedUser: User = await this.user.deleteUser(userId);
            res.status(200).json({ data: deletedUser, message: "deleteUser" });
        } catch (error) {
            next(error);
        }
    }

    public verifyUser = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const email: string = req.params.email;
            const token: string = req.params.token;

            const findToken = await VerificationTokenModel.findOne({ token: token, email: email });
            if (!findToken) {
                return res.status(400).json({ message: "Invalid token" });
            }
            const findUser = await UserModel.findOne({ email: email });
            if (!findUser) {
                return res.status(400).json({ message: "Invalid token" });
            }

            findUser.email_verified = new Date();

            findToken.remove();
            await findUser.save();
            return res.status(200).json({ message: "User verified" });
        } catch (error) {
            next(error);
        }
    }

    public getUserbyId = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId: string = req.params.userId;
            const findUser: User = await this.user.findUserById(userId);
            res.status(200).json({ data: findUser, message: "getUserbyId" });
        } catch (error) {
            next(error);
        }
    }

    public getUserbyEmail = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const email: string = req.params.email;
            const findUser: User = await this.user.findUserByEmail(email);
            res.status(200).json({ data: findUser, message: "getUserbyEmail" });
        } catch (error) {
            next(error);
        }
    }

    public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const users: User[] = await this.user.getAllUsers();
            res.status(200).json({ data: users, message: "getAllUsers" });
        } catch (error) {
            next(error);
        }
    }


    public getCurrentUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const userId: string = await TokenUtils.getUserIDFromToken(req);
            const findUser: User = await UserModel.findById(userId);

            res.status(200).json({ data: findUser, message: "getCurrentUser" });
        } catch (error) {
            next(error);
        }
    }

    public followUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const followUserId: string = await TokenUtils.getUserIDFromToken(req);
            const userId: string = req.params.userId;

            if (userId === followUserId) {
                return res.status(400).json({ message: "You can't follow yourself" });
            }

            const follow = await this.user.followUser(userId, followUserId);

            res.status(200).json({ message: follow });
        } catch (error) {
            next(error);
        }
    }
}