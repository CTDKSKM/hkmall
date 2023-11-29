import React, { useEffect, useState } from 'react';

import { currentUserState } from '../atom/currentUserState';
import { useRecoilValue } from 'recoil';
import ProductCard from '../components/COMMON/ProductCard';
import { Product } from '../static/const/type';
import { PRODUCTS_DUMMY } from '../static/const/productsDummy';
import useUserLikesQuery from '../hooks/useUserLikeQuery';

type Props = {};

const MyProductLike = (props: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const user = useRecoilValue(currentUserState);

  const { data, isLoading, isError } = useUserLikesQuery(user?.uid || '');

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, []);

  return (
    <div className="lg:w-1/3 h-screen mt-10">
      <div className="p-5">
        <h2 className="font-bold text-2xl">좋아요</h2>
        <h2 className="text-1xl my-3">상품</h2>

        <div className="h-120 flex items-center justify-center">
          {/* 쇼핑몰 이미지 그리드 */}
          <div className="grid-cols-1 md:grid-cols-4 flex">
            {/* 카드 반복 */}
            {filteredProducts.map((item: Product, key: number) => (
              <ProductCard item={item} key={key} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProductLike;
