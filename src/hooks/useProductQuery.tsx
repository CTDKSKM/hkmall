import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct, deleteProduct, getAllProductData } from '../utils/fireStore/dataManage';

const QUERY_KEY = 'getAllProduct';
const useProductQuery = () => {
  const query = useQueryClient();

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getAllProductData
    // staleTime: 60 * 1000,
  });
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [QUERY_KEY] });
    }
  });

  return { isLoading, isFetching, isError, data, error, addProductMutation, deleteProductMutation };
};

export default useProductQuery;
