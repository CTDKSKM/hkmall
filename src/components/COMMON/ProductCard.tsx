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
      <div className="overflow-hidden rounded-t-lg">
        <img className="hover:scale-125 transition-transform duration-300" src={item.imgs[0]} alt="이미지없음" />
      </div>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">{item.name}</h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{item.price}원</p>
      </div>
      <hr className="my-2" />
      <div className="p-6 flex">
        <AiFillHeart size={20} color="red" />
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{item.like}</p>
      </div>

      <button
        className="border border-red-500 z-50 hover:bg-blue-300"
        onClick={(e) => {
          e.preventDefault();
          deleteProductMutation.mutate(item.id);
        }}
      >
        삭제테스트
      </button>
    </Link>
  );
};

export default ProductCard;
