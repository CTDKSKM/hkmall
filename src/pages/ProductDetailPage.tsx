import React, { useEffect, useState } from 'react';
import { AiFillShopping } from 'react-icons/ai';
import { Product } from '../static/const/type';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hasPushedLike } from '../firebase/fireStore/userInteract';
import { currentUserState } from '../atom/currentUserState';
import { useNavigate, useParams } from 'react-router-dom';
import CofirmationBox from '../components/COMMON/CofirmationBox';
import useProductQuery, { ALL_PRODUCT_QUERY_KEY } from '../hooks/useProductQuery';
import { useQueryClient } from '@tanstack/react-query';
import LoadingIndicator from '../components/COMMON/LoadingIndicator';
import debounce from 'lodash/debounce';
import { Link } from 'react-router-dom';
import { category, currentCategory } from '../atom/currentCategory';
import LikeContainer from '../components/COMMON/LikeContainer';
import ProductImageSlider from '../components/ProductDetailPage/ProductImageSlider';

type Props = {};

const ProductDetailPage = (props: Props) => {
  const query = useQueryClient();
  const data = query.getQueryData([ALL_PRODUCT_QUERY_KEY]) as Product[];
  const [isInBasket, setInBasket] = useState(false);
  const { pid } = useParams();
  const [detailData, setDetailData] = useState<Product>();

  const currentUser = useRecoilValue(currentUserState);

  const setCategory = useSetRecoilState(currentCategory);
  const navi = useNavigate();
  const { updateBasketMutation } = useProductQuery();

  useEffect(() => {
    if (data) {
      const product = data.filter((product) => product.id === pid)[0];

      setDetailData(product);
    }
  }, [data]);

  useEffect(() => {
    // 첫 랜더링 시 장바구니 여부 확인
    if (data) {
      hasPushedLike(currentUser?.uid!, pid!, 'addedProducts').then((pushed) => {
        try {
          setInBasket(pushed!);
        } catch {}
      });
    }
  }, []);

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // 장바구니 클릭 핸들러
  const handleConfirm = () => {
    setIsConfirmOpen(false);

    if (currentUser && detailData) {
      // 이미 장바구니에 있거나 없거나
      if (isInBasket) {
        navi('/mypage/basket');
        setInBasket(true);
      } else {
        updateBasketMutation.mutate({ uid: currentUser?.uid, pid: detailData.id, mode: 'addedProducts' });

        setInBasket(true);
      }
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

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); // 기본 동작인 링크 이동을 막습니다.
    setCategory(detailData.category);

    const href = event.currentTarget.getAttribute('href');
    if (href) {
      window.location.href = href;
    }
  };
  const buyButtonHandler = () => {
    console.log(currentUser);
    if (!currentUser) {
      navi('/login');
    }
  };
  return (
    <div className="w-full lg:flex justify-between max-h-15.5">
      <div className="lg:w-3/5 sm:h-2/5">
        <div className="text-gray-500">
          <div className="bg-gray-200 inline-block max-content">
            카테고리 {'>'}
            <Link
              to={`/${Object.keys(category).find((key) => category[key] === detailData?.category)}`}
              className="text-gray-500 underline"
              onClick={handleLinkClick}
            >
              {detailData?.category}
            </Link>
          </div>
        </div>
        <p className="text-2xl font-extrabold">{detailData.name}</p>
        <div className="flex justify-center items-center">
          <ProductImageSlider imgs={detailData.imgs} />
        </div>
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

          <LikeContainer item={detailData} />
        </div>

        <div className="my-5 flex">
          <button onClick={buyButtonHandler} className="bg-black text-white sm:text-2xl md:text-3xl lg:text-4xl p-4">
            {currentUser ? '바로구매' : '회원전용'}
          </button>

          <div
            className="p-5 border-black border-2 hover:cursor-pointer"
            onClick={() => {
              if (!currentUser) {
                navi('/login');
              } else {
                setIsConfirmOpen((prev) => !prev);
              }
            }}
          >
            <AiFillShopping size={30} color={isInBasket ? '#429ceb' : 'black'} />
          </div>
        </div>

        <div>
          {isConfirmOpen && !isInBasket && (
            <CofirmationBox
              onConfirm={debounce(handleConfirm, 250)}
              onCancel={handleCancel}
              message="장바구니에 추가합니까?"
              nextMessage={null}
            />
          )}
        </div>
        <div>
          {isConfirmOpen && isInBasket && (
            <CofirmationBox
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              message={`이미 장바구니에 있는 상품입니다.`}
              nextMessage="장바구니로 이동합니까?"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
