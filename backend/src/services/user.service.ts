import { Service } from "typedi";
import { HttpException } from "../exceptions/httpsExceptions";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user.interface";

@Service()
export class UserService {
    public async updateUser(userId: string, userData: User): Promise<User> {
        const findUser: User = await UserModel.findById(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        const updatedUser: User = await UserModel.findByIdAndUpdate(userId, { ...userData }, { new: true });
        if (!updatedUser) throw new HttpException(409, "User not updated");

        return updatedUser;
    }

    public async verifyUser(userId: string): Promise<User> {
        const findUser = await UserModel.findById(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        findUser.email_verified = new Date();
        await findUser.save();

        return findUser;
    }

    public async deleteUser(userId: string): Promise<User> {
        const findUser: User = await UserModel.findById(userId);
        if (!findUser) throw new HttpException(409, "User not found");

        const deletedUser: User = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) throw new HttpException(409, "User not deleted");

        return deletedUser;
    }

    public async findUserById(userId: string): Promise<User> {
        const findUser: User = await UserModel.findById(userId).populate('posts').populate('comments').populate('notifications');
        if (!findUser) throw new HttpException(409, "User not found");

        return findUser;
    }

    public async findUserByEmail(email: string): Promise<User> {
        const findUser: User = await UserModel.findOne({ email: email }).populate('posts').populate('comments').populate('notifications');
        if (!findUser) throw new HttpException(409, "User not found");

        return findUser;
    }

    public async getAllUsers(): Promise<User[]> {
        const users: User[] = await UserModel.find().populate('posts').populate('comments').populate('notifications');
        if (!users) throw new HttpException(409, "Users not found");

        return users;
    }
}