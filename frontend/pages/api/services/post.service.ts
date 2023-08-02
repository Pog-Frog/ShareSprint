import {Network} from "@/pages/api/network";
import {Post} from "@/pages/api/interfaces/post.interface";
import {PostEndpoint} from "@/pages/api/endpoints/post.endpoints";

export class PostService {
    static async getPosts() {
        return Network.fetch(PostEndpoint.getPosts.url, {
            method: PostEndpoint.getPosts.method,
        }, true);
    }

    static async getPostById(postId: string) {
        return Network.fetch(PostEndpoint.getPostById.url + postId, {
            method: PostEndpoint.getPostById.method,
        }, true);
    }

    static async createPost(postData: Post) {
        return Network.fetch(PostEndpoint.createPost.url, {
            method: PostEndpoint.createPost.method,
            body: JSON.stringify(postData)
        }, true);
    }

    static async updatePost(postData: Post) {
        return Network.fetch(PostEndpoint.updatePost.url + postData._id, {
            method: PostEndpoint.updatePost.method,
            body: JSON.stringify(postData)
        }, true);
    }

    static async deletePost(postId: string) {
        return Network.fetch(PostEndpoint.deletePost.url + postId, {
            method: PostEndpoint.deletePost.method,
        }, true);
    }

    static async updatePostLikes(postId: string, like: number) {
        return Network.fetch(PostEndpoint.updatePostLikes.url + postId + '/likes', {
            method: PostEndpoint.updatePostLikes.method,
            body: JSON.stringify({"likes": like})
        }, true);
    }

    static async getComments(postId: string) {
        return Network.fetch(PostEndpoint.getComments.url + postId + '/comments', {
            method: PostEndpoint.getComments.method,
        }, true);
    }
}