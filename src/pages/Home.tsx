import { useEffect, useState } from 'react';

import ProductCard from '../components/COMMON/ProductCard';
import useProductQuery from '../hooks/useProductQuery';
import { Product } from '../static/const/type';
import LoadingIndicator from '../components/COMMON/LoadingIndicator';
import { category } from '../atom/currentCategory';

import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { productData } from '../atom/productData';
import { auth } from '../firebase/firebase';

type Props = {};

const Home = (props: Props) => {
  const { isLoading, isError, data, error } = useProductQuery();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const location = useLocation();

  const [path, setPath] = useState('');
  const setData = useSetRecoilState(productData);
  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, []);

  useEffect(() => {
    setPath(location.pathname);

    if (data && !isLoading) {
      const filtered = data.filter((product) => {
        const categoryKey = Object.keys(category).find((key) => category[key] === product.category);
        return categoryKey && path.includes(categoryKey);
      });

      setFilteredProducts(filtered);
    }

    if (path === '/' || path === '/ALL') {
      setFilteredProducts(data as Product[]);
    }
  }, [data, location.pathname, path]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <span>Error: {error!.message}</span>;
  }

  return (
    <div className="w-full flex items-center justify-center my-10 ">
      {/* 쇼핑몰 이미지 그리드 */}
      <div className="px-3 grid-cols-2 gap-2 sm:gap-2 md:gap-3 lg:gap-5 sm:grid md:grid-cols-3 lg:grid-cols-4 py-10">
        {/* 카드 반복 */}
        {filteredProducts?.map((item: Product, key: number) => (
          <ProductCard item={item} key={key} />
        ))}
      </div>
    </div>
  );
};

export default Home;
