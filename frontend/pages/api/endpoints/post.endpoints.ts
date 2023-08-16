import { DOMAIN } from "@/config"


export const PostEndpoint = {
    getPosts: {
        url: `${DOMAIN}/posts`,
        method: 'GET'
    },
    getPostsByUserId: {
        url: `${DOMAIN}/posts/user/id/`,
        method: 'GET'
    },
    getPostById: {
        url: `${DOMAIN}/posts/id/`,
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
        url: `${DOMAIN}/posts/id/`,
        method: 'PUT'
    },
    getComments: {
        url: `${DOMAIN}/posts/id/${'postId'}/comments`, ///id/:postId/comments
        method: 'GET'
    },
    createComment: {
        url: `${DOMAIN}/posts/id/`, ///id/:postId/comments
        method: 'POST'
    },
}