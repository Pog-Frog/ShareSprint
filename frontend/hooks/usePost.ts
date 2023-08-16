import useSWR from 'swr';
import axios from 'axios';
import { PostEndpoint } from '@/pages/api/endpoints/post.endpoints';


const usePost = (postId?: string) => {

  const fetcher = async (url: string) => await axios.get(url).then((res) => res.data.data);

  const url = postId ? `${PostEndpoint.getPostById.url}${postId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);
  

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default usePost;
