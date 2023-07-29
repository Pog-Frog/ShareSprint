import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { UpdateUserDto } from "../models/dtos/user.dto";


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
        this.router.get(`${this.path}/id/:id`, authMiddleware, this.userController.getUserbyId);
        this.router.put(`${this.path}/:id`, authMiddleware, validationMiddleware(UpdateUserDto), this.userController.updateUser);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.userController.deleteUser);
        this.router.get(`${this.path}/verify-email/:email/:token`, this.userController.verifyUser);
    }
}