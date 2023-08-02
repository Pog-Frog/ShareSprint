import { DOMAIN } from "@/config"


export const AuthEndpoint = {

    login: {
        url: `${DOMAIN}/login`,
        method: 'POST'
    },

    register: {
        url: `${DOMAIN}/signup`,
        method: 'POST'
    },

    logout: {
        url: `${DOMAIN}/logout`,
        method: 'POST'
    }
}