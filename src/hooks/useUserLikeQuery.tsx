import { useQuery } from '@tanstack/react-query';
import { getUserLikes } from '../utils/fireStore/dataManage';
// Import your getUserLikes function

export const LIKE_QUERY_KEY = 'userLikes';

const useUserLikesQuery = (uid: string, mode: 'like' | 'basket') => {
  return useQuery({
    queryKey: [LIKE_QUERY_KEY],
    queryFn: () => getUserLikes(uid, mode)
  });
};

export default useUserLikesQuery;
