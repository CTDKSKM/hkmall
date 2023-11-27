import React from 'react';
import { useLocation } from 'react-router';
import ProductImageSlider from '../components/ProductDetailPage/ProductImageSlider';

type Props = {};

const ProductDetailPage = (props: Props) => {
  const { state: detailData } = useLocation();

  return (
    <div className="w-full lg:flex justify-between">
      <div className="lg:w-3/5">
        <ProductImageSlider imgs={detailData.imgs} />
      </div>

      <div className="lg:w-1/3">
        <p>{detailData.name}</p>
        <p>{detailData.price}</p>
        <p>{detailData.category}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
