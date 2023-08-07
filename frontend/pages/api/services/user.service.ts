import { UserEndpoint } from "../endpoints/user.endpoint";
import { User } from "../interfaces/user.interface";
import { Network } from "../network";

export class UserService {
    static async getUsers() {
        return Network.fetch(UserEndpoint.getUsers.url, {
            method: UserEndpoint.getUsers.method,
        }, true);
    }

    static async getUserById(userId: any) {
        return Network.fetch(UserEndpoint.getUserById.url + userId, {
            method: UserEndpoint.getUserById.method,
        }, true);
    }

    static async getUserByEmail(email: string) {
        return Network.fetch(UserEndpoint.getUserByEmail.url + email, {
            method: UserEndpoint.getUserByEmail.method,
        }, true);
    }

    static async updateUser(userData: User, userId: any) {
        return Network.fetch(UserEndpoint.updateUser.url + userId, {
            method: UserEndpoint.updateUser.method,
            body: JSON.stringify(userData)
        }, true);
    }

    static async deleteUser(userId: string) {
        return Network.fetch(UserEndpoint.getUserById.url.replace('userId', userId), {
            method: UserEndpoint.deleteUser.method,
        }, true);
    }

    static async verifyUser(email: string, token: string) {
        return Network.fetch(UserEndpoint.verifyUser.url + email + '/' + token, {
            method: UserEndpoint.verifyUser.method,
        }, true);
    }

    static async getCurrentUser() {
        return Network.fetch(UserEndpoint.getCurrentUser.url, {
            method: UserEndpoint.getCurrentUser.method,
        }, true);
    }
}