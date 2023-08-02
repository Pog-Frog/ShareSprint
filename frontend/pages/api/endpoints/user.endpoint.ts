import { DOMAIN } from "@/config"


export const UserEndpoint = {
    getUsers: {
        url: `${DOMAIN}/users`,
        method: 'GET'
    },

    getUserById: {
        url: `${DOMAIN}/users/id/${'userId'}`,
        method: 'GET'
    },

    getUserByEmail: {
        url: `${DOMAIN}/users/${'email'}`,
        method: 'GET'
    },

    updateUser: {
        url: `${DOMAIN}/users/${'userId'}`,
        method: 'PUT'
    },

    deleteUser: {
        url: `${DOMAIN}/users/${'userId'}`,
        method: 'DELETE'
    },

    verifyUser: {
        url: `${DOMAIN}/users/verify-email/${'email'}/${'token'}`,
        method: 'GET'
    },

    getCurrentUser: {
        url: `${DOMAIN}/users/me`,
        method: 'GET'
    }
}