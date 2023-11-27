import ProductCard from '../components/COMMON/ProductCard';
import { Product } from '../static/const/type';
import { getAllData } from '../utils/fireStore/dataManage';
import { useQuery } from '@tanstack/react-query';

type Props = {};



const Home = (props: Props) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['getAllData'],
    queryFn: getAllData
  });


  if (isPending) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <body className="bg-gray-100">
      <div className="h-120 flex items-center justify-center">
        {/* 쇼핑몰 이미지 그리드 */}
        <div className="grid-cols-1 sm:grid md:grid-cols-4 ">
          {/* 카드 반복 */}

          {data.map((item: Product, key: number) => (
            <ProductCard item={item} key={key} />
          ))}
        </div>
      </div>
    </body>
  );
};

export default Home;
