import React from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addProduct, deleteProduct, getAllProductData } from '../utils/fireStore/dataManage';

const QUERY_KEY = 'getAllProduct';
const useProductQuery = () => {
  const query = useQueryClient();

  const { isPending, isError, data, error } = useQuery({
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

  return { isPending, isError, data, error, addProductMutation, deleteProductMutation };
};

export default useProductQuery;
