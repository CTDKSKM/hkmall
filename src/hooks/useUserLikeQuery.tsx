import { useQuery } from '@tanstack/react-query';
import { getUserInteractedItems } from '../utils/fireStore/dataManage';

const QUERY_KEY = 'userLikes';

const useUserInteractedItemsQuery = (uid: string, mode: 'likedProducts' | 'addedProducts') => {
  return useQuery({
    queryKey: [QUERY_KEY, uid, mode],
    queryFn: () => getUserInteractedItems(uid, mode)
  });
};

export default useUserInteractedItemsQuery;
