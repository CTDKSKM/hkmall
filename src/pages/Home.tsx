import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/COMMON/ProductCard';
import { Product } from '../static/const/type';
import { getAllData } from '../utils/fireStore/dataManage';
import { currentCategory } from '../atom/currentCategory';
import LoadingIndicator from '../components/COMMON/LoadingIndicator';

type Props = {};

const Home = (props: Props) => {
  const category = useRecoilValue(currentCategory);
  const { isPending, isError, data, error } = useQuery<Product[]>({
    queryKey: ['getAllData'],
    queryFn: getAllData
  });

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (data && category === '전체') {
      setFilteredProducts(data);
    } else if (data) {
      setFilteredProducts(data.filter((v) => v.category === category));
    }
  }, [category, data]);

  if (isPending) {
    return <LoadingIndicator />;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="bg-gray-100">
      <div className="h-120 flex items-center justify-center">
        {/* 쇼핑몰 이미지 그리드 */}
        <div className="grid-cols-1 sm:grid md:grid-cols-4">
          {/* 카드 반복 */}
          {filteredProducts.map((item: Product, key: number) => (
            <ProductCard item={item} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
