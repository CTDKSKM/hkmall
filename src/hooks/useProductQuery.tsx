import React from 'react';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct, deleteProduct, getAllProductData } from '../utils/fireStore/dataManage';
import { changeProductState } from '../utils/fireStore/userInteract';
import { Product } from '../static/const/type';
import { useRecoilValue } from 'recoil';
import { currentPushedLike } from '../atom/currentPushedLike';

export const ALL_PRODUCT_QUERY_KEY = 'getAllProduct';

const useProductQuery = () => {
  const queryClient = useQueryClient();
  const isPushed = useRecoilValue(currentPushedLike);

  const { isLoading, isFetching, isError, data, error } = useQuery({
    queryKey: [ALL_PRODUCT_QUERY_KEY],
    queryFn: getAllProductData
    // staleTime: 60 * 1000,
  });
  const addProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
    }
  });
  const updateProductMutation = useMutation({
    mutationFn: changeProductState,
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });

      // 이전 값
      const previousData = queryClient.getQueryData([ALL_PRODUCT_QUERY_KEY]);

      // 새로운 값으로 낙관적 업데이트 진행
      queryClient.setQueryData([ALL_PRODUCT_QUERY_KEY], (oldData: any) => {
        // Calculate the new like count optimistically
        // isPushed 가 true이면 -1 아니면 +1

        const updatedData = oldData.map((product: Product) => {
          if (product.id === newData.pid) {
            return { ...product, like: isPushed ? product.like - 1 : product.like + 1 };
          }
          return product;
        });

        // 값이 들어있는 context 객체를 반환
        return updatedData;
      });

      // 값이 들어있는 context 객체를 반환
      return { previousData };
    },
    // mutation이 실패하면 onMutate에서 반환된 context를 사용하여 롤백 진행
    onError(error, newData, context: any) {
      queryClient.setQueryData([ALL_PRODUCT_QUERY_KEY], context.previousData);
    },
    // 오류 또는 성공 후에는 항상 refetch
    onSettled() {
      queryClient.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
    }
  });
  const deleteProductMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ALL_PRODUCT_QUERY_KEY] });
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
