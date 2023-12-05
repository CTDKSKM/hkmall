import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ProductCard from '../components/COMMON/ProductCard';
import useProductQuery from '../hooks/useProductQuery';
import { Product } from '../static/const/type';
import LoadingIndicator from '../components/COMMON/LoadingIndicator';
import { currentCategory } from '../atom/currentCategory';
import { productData } from '../atom/productData';

type Props = {};

const Home = (props: Props) => {
  const { isLoading, isError, data, error } = useProductQuery();

  const category = useRecoilValue(currentCategory);
  const setData = useSetRecoilState(productData);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data) setData(data);

    if (data && category === '전체') {
      setFilteredProducts(data);
    } else if (data) {
      setFilteredProducts(data.filter((v) => v.category === category));
    }
  }, [category, data]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <span>Error: {error!.message}</span>;
  }

  return (
    <div className="w-4/5 mx-auto sm:w-4/5 lg:w-3/5 h-200 flex items-center justify-center my-10 ">
      {/* 쇼핑몰 이미지 그리드 */}
      <div className="px-3 grid-cols-2 gap-2 sm:gap-2 md:gap-3 lg:gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4 py-10">
        {/* 카드 반복 */}
        {filteredProducts.map((item: Product, key: number) => (
          <ProductCard item={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Home;
