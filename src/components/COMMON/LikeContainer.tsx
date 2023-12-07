import React, { useState, useEffect } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { Product } from '../../static/const/type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentUserState } from '../../atom/currentUserState';
import useProductQuery from '../../hooks/useProductQuery';
import { currentPushedLike } from '../../atom/currentPushedLike';
import { hasPushedLike } from '../../firebase/fireStore/userInteract';
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

type Props = { item: Product };

const LikeContainer = ({ item }: Props) => {
  const { updateLikeMutation } = useProductQuery();
  const [isLiked, setIsLiked] = useState(false);
  const setIsLike = useSetRecoilState(currentPushedLike);
  const navi = useNavigate();

  const user = useRecoilValue(currentUserState);
  const handleClickLikeButton = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (!user) {
      const check = window.confirm('로그인 하시겠습니까?');
      if (check) navi('/login');
      return;
    }
    setIsLike(isLiked);
    setIsLiked(!isLiked);

    updateLikeMutation.mutate({ uid: user.uid, pid: item.id, mode: 'likedProducts' });
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
