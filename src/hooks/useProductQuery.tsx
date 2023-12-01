import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct, deleteProduct, getAllProductData } from '../utils/fireStore/dataManage';
import { changeProductState } from '../utils/fireStore/userInteract';

export const ALL_PRODUCT_QUERY_KEY = 'getAllProduct';
const useProductQuery = () => {
  const query = useQueryClient();

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [ALL_PRODUCT_QUERY_KEY],
    queryFn: getAllProductData
    // staleTime: 60 * 1000,
  });
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
    }
  });
  const updateProductMutation = useMutation({
    mutationFn: changeProductState,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
    }
  });
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
    }
  });

  return {
    isLoading,
    isFetching,
    isError,
    data,
    error,
    addProductMutation,
    updateProductMutation,
    deleteProductMutation
  };
};

export default useProductQuery;
