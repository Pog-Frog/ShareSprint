import useSWR from 'swr';
import axios from 'axios';
import { PostEndpoint } from '@/pages/api/endpoints/post.endpoints';


const usePosts = (userId?: string) => {

  const fetcher = async (url: string) => await axios.get(url).then((res) => res.data.data);

  const url = userId ? `${PostEndpoint.getPostsByUserId.url}${userId}` : PostEndpoint.getPosts.url;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  console.log('usePosts.ts: ', userId);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePosts;
