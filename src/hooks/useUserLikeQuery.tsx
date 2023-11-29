import { useQuery } from '@tanstack/react-query';
import { getUserLikes } from '../utils/fireStore/dataManage';
// Import your getUserLikes function

const QUERY_KEY = 'userLikes';

const useUserLikesQuery = (uid: string) => {
  return useQuery({
    queryKey: [QUERY_KEY, uid],
    queryFn: () => getUserLikes(uid)
  });
};

export default useUserLikesQuery;
