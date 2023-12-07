import React from 'react';
import { Product } from '../../static/const/type';
import { Link } from 'react-router-dom';
import LikeContainer from './LikeContainer';

type Props = {
  item: Product;
};

const ProductCard = ({ item }: Props) => {
  return (
    <div className="relative">
      <Link to={`/products/${item.id}`}>
        <div className="productCardContainer">
          <div className="w-full h-1/2 overflow-hidden">
            <img
              className="w-full h-[200px] object-cover hover:scale-125 transition-transform duration-300"
              src={item.imgs[0]}
              alt="이미지없음"
            />
          </div>

          <div className="flex flex-col gap-2 p-2">
            <div className="font-bold text-xl">{item.name}</div>
            <p className="text-gray-700 text-base">{item.category}</p>
            <p className="text-gray-700 text-base">{item.price}원</p>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-3 right-3 sm:bottom-8 sm:right-3 lg:bottom-8 lg:right-5">
        <LikeContainer item={item} />
      </div>
    </div>
  );
};

export default ProductCard;
