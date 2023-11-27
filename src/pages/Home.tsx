import ProductCard from '../components/COMMON/ProductCard';
import useProductQuery from '../hooks/useProductQuery';
import { Product } from '../static/const/type';

type Props = {};

const Home = (props: Props) => {
  const { data } = useProductQuery();

  if (typeof data === 'object') {
    const productData = data as Product[];

    return (
      <body className="bg-gray-100">
        <div className="h-120 flex items-center justify-center">
          {/* 쇼핑몰 이미지 그리드 */}
          <div className="grid-cols-1 sm:grid md:grid-cols-4 ">
            {/* 카드 반복 */}

            {productData.length ? (
              productData.map((item: Product, key: number) => <ProductCard item={item} key={key} />)
            ) : (
              <div>상품이 없습니다.</div>
            )}
          </div>
        </div>
      </body>
    );
  } else return <>{data}</>;
};

export default Home;
