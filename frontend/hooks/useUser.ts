import useSWR from 'swr';
import axios from 'axios';
import { UserEndpoint } from '@/pages/api/endpoints/user.endpoint';

const useUser = (userId?: string) => {
    let fetcher;

    if(!userId ) {
        const auth = `Bearer ${localStorage.getItem('token')}`;
        fetcher = async (url: string) => await axios.get(url, {headers: {Authorization: auth}}).then((res) => res.data.data);
    } else {
        fetcher = async (url: string) => await axios.get(url).then((res) => res.data.data);
    }
    
    const url = userId ? `${UserEndpoint.getUserById.url}${userId}` : `${UserEndpoint.getCurrentUser.url}`;

    const { data, error, isLoading, mutate } = useSWR(url, fetcher);
    
    return {
        data,
        error,
        isLoading,
        mutate
    }
};

export default useUser;