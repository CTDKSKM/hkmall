import { useQuery } from '@tanstack/react-query';
import { getUserLikes } from '../utils/fireStore/dataManage';
// Import your getUserLikes function

const QUERY_KEY = 'userLikes';

const useUserLikesQuery = (uid: string, mode: 'like' | 'basket') => {
  return useQuery({
    queryKey: [QUERY_KEY, uid, mode],
    queryFn: () => getUserLikes(uid, mode)
  });
};

export default useUserLikesQuery;
