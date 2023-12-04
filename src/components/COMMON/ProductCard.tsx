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
    <Link to={`/products/${item.id}`} className="productCardContainer">
      <div className="w-full justify-center max-h-15.5 items-center p-5">
        <img
          className="hover:scale-125 transition-transform duration-300 w-[160px] h-[200px] p-3"
          src={item.imgs[0]}
          alt="이미지없음"
        />

        <div className="px-6 py-4 h-3/6">
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

      {/* <button
        className="border border-red-500 z-50 hover:bg-blue-300"
        onClick={(e) => {
          e.preventDefault();
          deleteProductMutation.mutate(item.id);
        }}
      >
        삭제테스트
      </button> */}
    </Link>
  );
};

export default ProductCard;
