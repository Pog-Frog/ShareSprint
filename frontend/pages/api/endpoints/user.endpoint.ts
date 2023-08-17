import { DOMAIN } from "@/config"


export const UserEndpoint = {
    getUsers: {
        url: `${DOMAIN}/users`,
        method: 'GET'
    },

    getUsersToFollow: {
        url: `${DOMAIN}/users/user/others`,
        method: 'GET'
    },

    getUserById: {
        url: `${DOMAIN}/users/id/`,
        method: 'GET'
    },

    getUserByEmail: {
        url: `${DOMAIN}/users/`,
        method: 'GET'
    },

    updateUser: {
        url: `${DOMAIN}/users/`,
        method: 'PUT'
    },

    deleteUser: {
        url: `${DOMAIN}/users/`,
        method: 'DELETE'
    },

    verifyUser: {
        url: `${DOMAIN}/users/verify-email/`, //${DOMAIN}/users/verify-email/${'email'}/${'token'}
        method: 'GET'
    },

    getCurrentUser: {
        url: `${DOMAIN}/users/user/me`,
        method: 'GET'
    },

    followUser: {
        url: `${DOMAIN}/users/follow/`,
        method: 'POST'
    },
}