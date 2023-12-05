import React from 'react';
import { Product } from '../../static/const/type';
import { Link } from 'react-router-dom';
import useProductQuery from '../../hooks/useProductQuery';
import { AiFillHeart } from 'react-icons/ai';

type Props = {
  item: Product;
};

const ProductCard = ({ item }: Props) => {
  const { deleteProductMutation } = useProductQuery();

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

        <div className="px-2 py-4 h-1/3">
          <div className="font-bold text-xl mb-2">{item.name}</div>
          <p className="text-gray-700 text-base mb-2">{item.category}</p>
          <p className="text-gray-700 text-base mb-2">{item.price}원</p>

          <div className="flex items-center mb-4">
            {/* <AiFillHeart className="text-red-500 mr-2" /> */}
            <p className="text-gray-700 flex">
              {' '}
              <AiFillHeart size={20} color="red" />
              {item.like}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
