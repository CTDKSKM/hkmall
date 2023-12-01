import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct, deleteProduct, getAllProductData } from '../utils/fireStore/dataManage';
import { changeProductState } from '../utils/fireStore/userInteract';
import { Product } from '../static/const/type';
import { LIKE_QUERY_KEY } from './useUserLikeQuery';

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
    onMutate: async (updatedProduct) => {
      await query.cancelQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });

      const previousProducts = query.getQueryData([ALL_PRODUCT_QUERY_KEY]) as Product[];

      query.setQueryData([ALL_PRODUCT_QUERY_KEY], () =>
        previousProducts.map((product) =>
          product.id === updatedProduct.pid ? { ...product, like: product.like + 1 } : product
        )
      );

      return { previousProducts };
    },
    onError: (err, newProduct, context) => {
      query.setQueryData([ALL_PRODUCT_QUERY_KEY], context?.previousProducts);
    },
    onSettled: () => {
      query.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
      query.invalidateQueries({ queryKey: [LIKE_QUERY_KEY] });
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
