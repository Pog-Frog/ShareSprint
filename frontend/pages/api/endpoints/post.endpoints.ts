import { DOMAIN } from "@/config"


export const PostEndpoint = {
    getPosts: {
        url: `${DOMAIN}/posts`,
        method: 'GET'
    },
    getPostById: {
        url: `${DOMAIN}/posts/`,
        method: 'GET'
    },
    createPost: {
        url: `${DOMAIN}/posts/`,
        method: 'POST'
    },
    updatePost: {
        url: `${DOMAIN}/posts/id/${'postId'}`,
        method: 'PUT'
    },
    deletePost: {
        url: `${DOMAIN}/posts/id/${'postId'}`,
        method: 'DELETE'
    },
    updatePostLikes: {
        url: `${DOMAIN}/posts/id/${'likes'}/likes`,
        method: 'PUT'
    },
    getComments: {
        url: `${DOMAIN}/posts/id/${'postId'}/comments`,
        method: 'GET'
    },
}