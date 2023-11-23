import React, { useEffect, useState } from 'react';
import ProductCard from '../components/COMMON/ProductCard';
import { Product } from '../static/const/type';
import { getAllData } from '../utils/fireStore/dataManage';

type Props = {};

const Home = (props: Props) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const productData = await getAllData();

      if (productData.length) {
        setProducts(productData);
      }
    };

    fetchData();
  }, []);

  return (
    <body className="bg-gray-100">
      <div className="h-120 flex items-center justify-center">
        {/* 쇼핑몰 이미지 그리드 */}
        <div className="grid-cols-1 sm:grid md:grid-cols-4 ">
          {/* 카드 반복 */}

          {products.map((item: Product, key: number) => (
            <ProductCard item={item} key={key} />
          ))}
        </div>
      </div>
    </body>
  );
};

export default Home;
