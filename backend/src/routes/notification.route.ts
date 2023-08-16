import { Router } from 'express';
import { Routes } from '../interfaces/route.interface';
import { NotificationController } from '../controllers/notification.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validationMiddleware } from '../middlewares/validation.middleware';
import { CreateNotificationDto, UpdateNotificationDto } from '../models/dtos/notification.dto';

export class NotificationRoute implements Routes {
    public path = '/api/notification';
    public router = Router();
    public notificationController = new NotificationController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, authMiddleware, this.notificationController.getNotifications);
        this.router.post(`${this.path}`, authMiddleware, validationMiddleware(CreateNotificationDto), this.notificationController.addNotification);
    }
}