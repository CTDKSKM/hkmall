import React, { useState } from 'react';
import { Product, User } from '../../static/const/type';
import { AiFillHeart } from 'react-icons/ai';
import useProductQuery from '../../hooks/useProductQuery';
import CofirmationBox from './CofirmationBox';

type Props = {
  product: Product;
  user: User | null;
};

const LikeProductCard = ({ product, user }: Props) => {
  const { updateProductMutation } = useProductQuery();

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const cofirmHandler = () => {
    setIsConfirmOpen(false);

    updateProductMutation.mutate({ uid: user!.uid, pid: product.id, mode: 'likedProducts' });
  };
  const cancelHandler = () => {
    setIsConfirmOpen(false);
  };
  if (updateProductMutation.isSuccess) {
    window.location.reload();
    alert('삭제되었습니다');
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg cardHoverEffect">
      <img className="w-full h-48 object-cover" src={product.imgs[0]} alt={product.name} />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base mb-2">{product.category}</p>
        <p className="text-gray-700 text-base mb-2">{product.price}원</p>

        <div className="flex items-center mb-4">
          {/* <AiFillHeart className="text-red-500 mr-2" /> */}
          <p className="text-gray-700 flex">
            {' '}
            <AiFillHeart size={20} color="red" />
            {product.like}
          </p>
        </div>

        <button
          className="bg-red-500 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline buttonEffect"
          onClick={() => setIsConfirmOpen((prev) => !prev)}
        >
          삭제
        </button>
        {isConfirmOpen && (
          <CofirmationBox
            message="좋아요 품목에서 삭제할까요?"
            nextMessage={null}
            onConfirm={cofirmHandler}
            onCancel={cancelHandler}
          />
        )}
      </div>
    </div>
  );
};

export default LikeProductCard;
