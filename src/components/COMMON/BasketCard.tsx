import React, { useState } from 'react';
import { Product, User } from '../../static/const/type';
import CofirmationBox from './CofirmationBox';
import useProductQuery from '../../hooks/useProductQuery';

type Props = {
  item: Product;
  user: User;
};
const BasketCard = ({ item, user }: Props) => {
  const { updateBasketMutation } = useProductQuery();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const cofirmHandler = () => {
    setIsConfirmOpen(false);

    updateBasketMutation.mutate({ uid: user!.uid, pid: item.id, mode: 'addedProducts' });
  };
  const cancelHandler = () => {
    setIsConfirmOpen(false);
  };
  if (updateBasketMutation.isSuccess) {
    window.location.reload();
    alert('삭제되었습니다');
  }

  return (
    <div className="bg-white p-4 rounded-md shadow-md">
      {/* TODO 슬라이더로 구현 */}
      <img src={item.imgs[0]} alt="Product" className="mb-4 rounded-md w-full h-40 object-cover" />
      <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
      <p className="text-gray-600 mb-4">{item.category}</p>
      <div className="flex justify-between items-center">
        <span className="text-lg font-bold">￦{item.price}</span>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsConfirmOpen((prev) => !prev)}
        >
          삭제
        </button>
        {isConfirmOpen && (
          <CofirmationBox
            message="상품을 삭제하시겠습니까?"
            nextMessage={null}
            onConfirm={cofirmHandler}
            onCancel={cancelHandler}
          />
        )}
      </div>
    </div>
  );
};

export default BasketCard;
