import React from 'react';
import { PRODUCTS_DUMMY } from '../static/const/productsDummy';
import ProductCard from '../components/COMMON/ProductCard';
import { Product } from '../static/const/type';

type Props = {};

const Home = (props: Props) => {
  const dummy = PRODUCTS_DUMMY.concat(Array.from({ length: 1 }, () => PRODUCTS_DUMMY).flat());

  return (
    <body className="bg-gray-100">
      <div className="h-120 flex items-center justify-center">
        {/* 쇼핑몰 이미지 그리드 */}
        <div className="grid-cols-1 sm:grid md:grid-cols-4 ">
          {/* 카드 반복 */}

          {dummy.map((item: Product, key: number) => (
            <ProductCard item={item} key={key} />
          ))}
        </div>
      </div>
    </body>
  );
};

export default Home;
