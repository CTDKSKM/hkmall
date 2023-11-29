import React from 'react';
import { Product } from '../../static/const/type';

type Props = {
  item: Product;
};

const BasketCard = ({ item }: Props) => {
  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {/* TODO 슬라이더로 구현 */}
      <img src={item.imgs[0]} alt="Product" className="mb-4 rounded-md w-full h-40 object-cover" />
      <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
      <p className="text-gray-600 mb-4">{item.category}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">￦{item.price}</span>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">삭제</button>
      </div>
    </div>
  );
};

export default BasketCard;
