import React from 'react';
import { Product } from '../../static/const/type';
import { Link } from 'react-router-dom';
import useProductQuery from '../../hooks/useProductQuery';

type Props = {
  item: Product;
};

const ProductCard = ({ item }: Props) => {
  const { deleteProductMutation } = useProductQuery();

  return (
    <Link
      to={`products/${item.id}`}
      state={item}
      className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
    >
      <div className="overflow-hidden rounded-t-lg">
        <img
          className="hover:scale-125 transition-transform duration-300"
          src={item.imgs[0]}
          alt="Hollywood Sign on The Hill"
        />
      </div>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">{item.name}</h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{item.price}</p>
      </div>
      <button
        className="border border-red-500 z-50 hover:bg-blue-300"
        onClick={(e) => {
          // e.stopPropagation();
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
