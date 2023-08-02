import { Network } from "@/pages/api/network";
import { User } from "@/pages/api/interfaces/user.interface";
import { AuthEndpoint } from "@/pages/api/endpoints/auth.endpoint";

export class AuthService {
    static async login(userData: User) {
        return Network.fetch(AuthEndpoint.login.url, {
            method: AuthEndpoint.login.method,
            body: JSON.stringify(userData)
        }, false);
    }

    static async register(userData: User) {
        return Network.fetch(AuthEndpoint.register.url, {
            method: AuthEndpoint.register.method,
            body: JSON.stringify(userData)
        }, false);
    }

    static async logout() {
        return Network.fetch(AuthEndpoint.logout.url, {
            method: AuthEndpoint.logout.method
        }, true);
    }
}