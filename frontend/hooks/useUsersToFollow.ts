import useSWR from 'swr';
import axios from 'axios';
import { UserEndpoint } from '@/pages/api/endpoints/user.endpoint';
import { useSelector } from 'react-redux';
import { selectAuthState } from '@/redux/reducers/auth.reducer';
import { User } from '@/pages/api/interfaces/user.interface';

const useUsersToFollow = () => {
    let fetcher;
    let url;
    const isAuthenticated = useSelector(selectAuthState);

    if(isAuthenticated) {
        const auth = `Bearer ${localStorage.getItem('token')}`;
        fetcher = async (url: string) => await axios.get(url, {headers: {Authorization: auth}}).then((res) => res.data.data);
        url = `${UserEndpoint.getUsersToFollow.url}`;
    } else {
        fetcher = async (url: string) => await axios.get(url).then((res) => res.data.data);
        url = `${UserEndpoint.getUsers.url}`;
    }

    const { data: Users, error, isLoading, mutate } = useSWR(url, fetcher);
    
    return {
        data: Users as User[],
        error,
        isLoading,
        mutate
    }
};

export default useUsersToFollow;