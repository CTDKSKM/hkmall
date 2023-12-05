import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Product } from '../../static/const/type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState } from '../../atom/currentUserState';
import useProductQuery from '../../hooks/useProductQuery';
import { currentPushedLike } from '../../atom/currentPushedLike';
import { hasPushedLike } from '../../utils/fireStore/userInteract';
import debounce from 'lodash/debounce';

type Props = { item: Product };

const LikeContainer = ({ item }: Props) => {
  const { updateProductMutation } = useProductQuery();
  const [isLiked, setIsLiked] = useState(false);
  const setIsLike = useSetRecoilState(currentPushedLike);

  const user = useRecoilValue(currentUserState);
  const handleClickLikeButton = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsLike(isLiked);
    setIsLiked(!isLiked);
    if (user) {
      updateProductMutation.mutate({ uid: user.uid, pid: item.id, mode: 'likedProducts' });
    }
  };
  useEffect(() => {
    hasPushedLike(user?.uid!, item.id!, 'likedProducts').then((pushed) => {
      try {
        setIsLiked(pushed!);
      } catch {}
    });
  }, []);
  return (
    <div
      className="text-gray-700 flex items-center z-50 hover:cursor-pointer"
      onClick={debounce(handleClickLikeButton, 250)}
    >
      {isLiked ? <AiFillHeart size={20} color="red" /> : <AiOutlineHeart size={20} color="red" />}
      {item.like}
    </div>
  );
};

export default LikeContainer;
