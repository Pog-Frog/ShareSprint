import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { CreateUserDto, LoginUserDto } from "../models/dtos/user.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validationMiddleware } from "../middlewares/validation.middleware";
import { Routes } from "../interfaces/route.interface"
import { alreadyAuthorizedMiddleware } from "../middlewares/already_authorized.middleware";

export class AuthRoute implements Routes {
    public path = "/api";
    public router = Router();
    public authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/signup`, alreadyAuthorizedMiddleware, validationMiddleware(CreateUserDto), this.authController.signup);
        this.router.post(`${this.path}/login`, alreadyAuthorizedMiddleware, validationMiddleware(LoginUserDto), this.authController.login);
        this.router.post(`${this.path}/logout`, authMiddleware, this.authController.logout);
    }
}