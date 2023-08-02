export class Network {
    static async fetch(url: string, options: any, addAuth: boolean) {
        const headers = Network.getHeaders(options.headers, addAuth);
        const response = await fetch(url, {
            ...options,
            headers
        });
        if (response.ok) {
            return response.json();
        } else {
            return Network.handleErrors(response);
        }
    }

    static getHeaders(headers: any, addAuth: boolean) {
        let newHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            ...headers
        };
        if (addAuth) {
            newHeaders['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        }
        return newHeaders;
    }

    static handleErrors(response: Response) {
        switch (response.status) {
            case 401:
                localStorage.removeItem('token');
                return response.json().then((data: any) => {
                    return Promise.reject(data);
                });
            case 500:
                return response.json().then((data: any) => {
                    return Promise.reject(data);
                });
            default:
                return response.json().then((data: any) => {
                    return Promise.reject(data);
                });
        }
    }
}