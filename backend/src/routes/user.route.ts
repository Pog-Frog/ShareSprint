import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { UpdateUserDto } from "../models/dtos/user.dto";
import { alreadyAuthorizedMiddleware } from "../middlewares/already_authorized.middleware";


export const user_path = "/api/users";

export class UserRoute implements Routes {
    public path = user_path;
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}/:email`, authMiddleware, this.userController.getUserbyEmail);
        this.router.get(`${this.path}/id/:userId`, this.userController.getUserbyId);
        this.router.put(`${this.path}/:userId`, authMiddleware, validationMiddleware(UpdateUserDto), this.userController.updateUser);
        this.router.delete(`${this.path}/:userId`, authMiddleware, this.userController.deleteUser);
        this.router.get(`${this.path}/verify-email/:email/:token`, alreadyAuthorizedMiddleware, this.userController.verifyUser);
        this.router.get(`${this.path}/user/me`, authMiddleware, this.userController.getCurrentUser);
        this.router.get(`${this.path}`, this.userController.getAllUsers);
        this.router.get(`${this.path}/user/others`, authMiddleware, this.userController.getUsersToFollow);
        this.router.post(`${this.path}/follow/:userId`, authMiddleware, this.userController.followUser);
    }
}