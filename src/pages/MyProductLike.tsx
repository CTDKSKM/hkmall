import React, { useEffect, useMemo, useState } from 'react';

import { currentUserState } from '../atom/currentUserState';
import { useRecoilValue } from 'recoil';
import ProductCard from '../components/COMMON/ProductCard';
import { Product } from '../static/const/type';

import useUserInteractedItemsQuery from '../hooks/useUserLikeQuery';

import LoadingIndicator from '../components/COMMON/LoadingIndicator';
import LikeProductCard from '../components/COMMON/LikeProductCard';

type Props = {};

const MyProductLike = (props: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const user = useRecoilValue(currentUserState);

  const { data, isLoading, isError, refetch } = useUserInteractedItemsQuery(user?.uid || '', 'likedProducts');

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, [data]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    console.log('에러가 발생했습니다');
  }

  return (
    <div className="lg:w-5/6 h-5/6 mt-10">
      <div className="p-5">
        <h2 className="font-bold text-2xl">좋아요</h2>
        <h2 className="text-1xl my-3">상품</h2>

        {/* 쇼핑몰 이미지 그리드 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* 카드 반복 */}
          {filteredProducts.map((item: Product, key: number) => (
            // <ProductCard item={item} key={key} />
            <LikeProductCard product={item} user={user} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyProductLike;
