import { Service } from "typedi";
import { HttpException } from "../exceptions/httpsExceptions";
import { UserModel } from "../models/user.model";
import { User } from "../interfaces/user.interface";
import { Notification } from "../interfaces/notificaiton.interface";
import { NotificationModel } from "../models/notification.model";


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
        let findUser: User = await UserModel.findById(userId).populate('posts').populate('comments');
        const followingCount  = await UserModel.countDocuments({followers: userId});
        findUser = findUser.toJSON();
        findUser.followingCount = followingCount;
        if (!findUser) throw new HttpException(409, "User not found");

        return findUser;
    }

    public async findUserByEmail(email: string): Promise<User> {
        let findUser: User = await UserModel.findOne({ email: email }).populate('posts').populate('comments');
        const followingCount  = await UserModel.countDocuments({followers: findUser._id});
        findUser = findUser.toJSON();
        findUser.followingCount = followingCount;
        if (!findUser) throw new HttpException(409, "User not found");

        return findUser;
    }

    public async getAllUsers(): Promise<User[]> {
        const users: User[] = await UserModel.find().populate('posts').populate('comments');
        if (!users) throw new HttpException(409, "Users not found");

        return users;
    }

    public async getUsersToFollow(currentId: string): Promise<User[]> {
        const users: User[] = await UserModel.find();
        const filteredUsers = users.filter(user => user._id.toString() !== currentId && !user.followers.includes(currentId));
        if(!filteredUsers) throw new HttpException(409, "Users not found");

        return filteredUsers;
    }

    public async followUser(userId: string, followerId: string): Promise<string> {
        const getUser = await UserModel.findById(userId);
        if (!getUser) throw new HttpException(409, "User not found");

        const getFollower: User = await UserModel.findById(followerId);
        if (!getFollower) throw new HttpException(409, "Follower not found");

        console.log(getUser.followers);

        if (getUser.followers.includes(getFollower._id)) {
            if (getUser.followers.length > 0) {
                const index = getUser.followers.indexOf(getFollower._id);
                getUser.followers.splice(index, 1);
            } else {
                getUser.followers = [];
            }
            await getUser.save();

            return "User unfollowed";
        }

        getUser.followers.push(getFollower._id);
        await getUser.save();

        const notification: Notification = {
            receiver: getUser._id,
            body: `${getFollower.username} started following you`,
        }
        
        const newNotification = await NotificationModel.create(notification);
        if(!newNotification) throw new HttpException(409, "Internal server error");

        getUser.has_notifications = true;
        await getUser.save();

        return "User followed";
    }
}