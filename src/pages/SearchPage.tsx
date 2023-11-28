import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { productData } from '../atom/productData';
import { Product } from '../static/const/type';
import ProductCard from '../components/COMMON/ProductCard';

type Props = {};

const SearchPage = (props: Props) => {
  const [searchParams] = useSearchParams();
  const value = searchParams.get('q') || '';
  const data = useRecoilValue(productData).filter((product) => product.name.includes(value));

  if (!value) return <p>검색어 "{value}"로 검색된 결과가 없습니다.</p>;

  return (
    <div className="bg-gray-100">
      <p className="p-5">
        검색어 "{value}"로 검색된 총 {data.length}개의 결과가 있습니다.
      </p>
      <div className="h-120 flex items-center justify-center">
        {/* 쇼핑몰 이미지 그리드 */}
        <div className="grid-cols-1 sm:grid md:grid-cols-4">
          {/* 카드 반복 */}
          {data.map((item: Product, key: number) => (
            <ProductCard item={item} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
