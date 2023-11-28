import React, { useState } from 'react';
import { useLocation } from 'react-router';
import ProductImageSlider from '../components/ProductDetailPage/ProductImageSlider';
import { AiFillHeart, AiFillShopping } from 'react-icons/ai';
import { Category, Product } from '../static/const/type';
import { useSetRecoilState } from 'recoil';
import { currentCategory } from '../atom/currentCategory';

type Props = {};

const ProductDetailPage = (props: Props) => {
  const [click, setClick] = useState(false);
  const { state: detailData }: { state: Product } = useLocation();
  const setCategory = useSetRecoilState(currentCategory);
  return (
    <div className="w-full lg:flex justify-between h-screen">
      <div className="lg:w-3/5">
        <div className="text-gray-500">
          <a href="#" className="text-gray-500 underline">
            대분류
          </a>
          {'>'}
          <a href="/" className="text-gray-500  underline" onClick={() => setCategory(detailData.category as Category)}>
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
          <button className="bg-black text-white text-4xl p-5">바로구매</button>

          <div className="p-5 border-black border-2 hover:cursor-pointer" onClick={() => setClick((prev) => !prev)}>
            <AiFillHeart size={30} color={click ? 'red' : 'black'} />
          </div>
          <div className="p-5 border-black border-2 hover:cursor-pointer">
            <AiFillShopping size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
