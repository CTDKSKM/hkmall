import React from 'react';
import { Product } from '../../static/const/type';
import { Link } from 'react-router-dom';
import { AiFillHeart } from 'react-icons/ai';
import LikeContainer from './LikeContainer';

type Props = {
  item: Product;
};

const ProductCard = ({ item }: Props) => {
  return (
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

          <div className="flex justify-end">
            <LikeContainer item={item} />
            {/* <div className="text-gray-700 flex items-center z-50">
              <AiFillHeart size={20} color="red" />
              {item.like}
            </div> */}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
