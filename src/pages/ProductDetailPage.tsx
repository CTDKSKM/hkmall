import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import ProductImageSlider from '../components/ProductDetailPage/ProductImageSlider';
import { AiFillHeart, AiFillShopping } from 'react-icons/ai';
import { Category, Product } from '../static/const/type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { currentCategory } from '../atom/currentCategory';
import { hasPushedItem } from '../utils/fireStore/userInteract';
import { currentUserState } from '../atom/currentUserState';
import { useNavigate, useParams } from 'react-router-dom';
import CofirmationBox from '../components/COMMON/CofirmationBox';
import useProductQuery, { ALL_PRODUCT_QUERY_KEY } from '../hooks/useProductQuery';
import { useQueryClient } from '@tanstack/react-query';
import LoadingIndicator from '../components/COMMON/LoadingIndicator';

type Props = {};

const ProductDetailPage = (props: Props) => {
  const query = useQueryClient();
  const data = query.getQueryData([ALL_PRODUCT_QUERY_KEY]) as Product[];
  const [isLiked, setIsLiked] = useState(false);
  const [hasBasket, setHasBasket] = useState(false);
  const { pid } = useParams();

  const [detailData, setDetailData] = useState<Product>();

  const currentUser = useRecoilValue(currentUserState);
  const navi = useNavigate();
  const { updateProductMutation } = useProductQuery();

  useEffect(() => {
    if (data) setDetailData(data.filter((product) => product.id === pid)[0]);
  }, [data]);

  // 좋아요 클릭 핸들러
  const clickLikeHandler = () => {
    if (currentUser && detailData) {
      updateProductMutation.mutate({ uid: currentUser?.uid, pid: detailData.id, mode: 'add_like' });
      setIsLiked((prev) => !prev);
    } else navi('/login');
  };

  useEffect(() => {
    if (detailData) {
      hasPushedItem(currentUser?.uid!, detailData.id, 'like').then((added) => {
        try {
          setIsLiked(added!);
        } catch {}
      });
      hasPushedItem(currentUser?.uid!, detailData.id, 'basket').then((added) => {
        try {
          setHasBasket(added!);
        } catch {}
      });
    }
  }, [detailData]);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 장바구니 클릭 핸들러
  const handleConfirm = () => {
    setIsConfirmOpen(false);
    if (currentUser && detailData && !hasBasket) {
      updateProductMutation.mutate({ uid: currentUser?.uid, pid: detailData.id, mode: 'add_basket' });
      // navi('/mypage/basket');
    } else navi('/login');

    if (hasBasket) {
      navi('/mypage/basket');
    }
  };

  const handleCancel = () => {
    setIsConfirmOpen(false);
  };

  if (!detailData)
    return (
      <div>
        <LoadingIndicator />
      </div>
    );

  return (
    <div className="w-full lg:flex justify-between h-screen">
      <div className="lg:w-3/5">
        <div className="text-gray-500">
          <a href="#" className="text-gray-500 underline">
            대분류
          </a>
          {'>'}
          <a
            href="/"
            className="text-gray-500  underline"
            // onClick={() => setCategory(detailData.category as Category)}
          >
            소분류
          </a>
        </div>
        <p className="text-2xl font-extrabold">{detailData.name}</p>
        <ProductImageSlider imgs={detailData.imgs} />
      </div>

      <div className="lg:w-1/3">
        <h2 className="text-lg font-bold">Product Info</h2>
        <hr />
        <div className="flex">
          <p className="mr-3">가격</p>
          <p>{detailData.price}원</p>
        </div>
        <div className="flex">
          <p className="mr-3">제품명</p>
          <p>{detailData.category}</p>
        </div>
        <div className="flex">
          <p className="mr-3">좋아요</p>

          <AiFillHeart size={20} color="red" />

          <p className="text-red-600">{detailData.like}</p>
        </div>

        <div className="mt-5 flex">
          <button className="bg-black text-white text-4xl p-5">{currentUser ? '바로구매' : '회원전용'}</button>

          {/* 좋아요 이미지 */}
          <div className="p-5 border-black border-2 hover:cursor-pointer" onClick={clickLikeHandler}>
            <AiFillHeart size={30} color={isLiked ? 'red' : 'black'} />
          </div>

          {/* 바구니 이미지 */}
          <div
            className="p-5 border-black border-2 hover:cursor-pointer"
            onClick={() => setIsConfirmOpen((prev) => !prev)}
          >
            <AiFillShopping size={30} color={!hasBasket ? 'black' : 'blue'} />
          </div>
        </div>

        <div>
          {isConfirmOpen && !hasBasket && (
            <CofirmationBox onConfirm={handleConfirm} onCancel={handleCancel} message="장바구니에 추가합니까?" />
          )}
        </div>
        <div>
          {isConfirmOpen && hasBasket && (
            <CofirmationBox
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              message="이미 추가된 상품입니다. 장바구니로 이동합니까?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
