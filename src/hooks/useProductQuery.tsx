import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct, deleteProduct, getAllProductData } from '../utils/fireStore/dataManage';

const QUERY_KEY = 'getAllProduct';
const useProductQuery = () => {
  const query = useQueryClient();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getAllProductData
  });

  //   const addProductMutation = useMutation({
  //     mutationFn: addProduct,
  //     onSuccess: () => {
  //       query.invalidateQueries({ queryKey: [QUERY_KEY] });
  //     }
  //   });
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });
  if (isLoading) return { data: <div>로딩중입니다</div>, deleteProductMutation };
  if (isError) return { data: <div>{error.message}</div>, deleteProductMutation };
  return { data, deleteProductMutation };
};

export default useProductQuery;
