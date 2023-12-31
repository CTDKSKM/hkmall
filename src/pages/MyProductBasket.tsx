import React, { useEffect, useState } from 'react';
import { Product } from '../static/const/type';
import { currentUserState } from '../atom/currentUserState';
import { useRecoilValue } from 'recoil';
import useUserInteractedItemsQuery from '../hooks/useUserLikeQuery';
import LoadingIndicator from '../components/COMMON/LoadingIndicator';
import BasketCard from '../components/COMMON/BasketCard';
import { comma, uncomma } from '../utils/number';

type Props = {};

const MyProductBasket = (props: Props) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const user = useRecoilValue(currentUserState);
  const [curTotal, setCurTotal] = useState('');
  const [total, setTotal] = useState('');
  // const SHIPPING_COST= '5000'

  const { data, isLoading, isError, refetch } = useUserInteractedItemsQuery(user?.uid || '', 'addedProducts');

  const completeOrderHandler = () => {
    alert('미구현 기능입니다!');
  };

  const makeTotal = () => {
    const sum = filteredProducts?.reduce((acc, cur) => {
      const price = parseInt(uncomma(cur.price as string));
      return acc + price;
    }, 0);

    setCurTotal(comma(sum + ''));
    setTotal(comma(sum + 5000 + ''));
  };

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
    if (filteredProducts !== null) {
      makeTotal();
    }
  }, [data, filteredProducts]);
  useEffect(() => {
    refetch();
  }, []);
  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (isError) {
    return <>에러가 발생했습니다</>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>

      {/* Product list in the cart */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample product card */}
        {filteredProducts?.map((item: Product, key: number) => (
          <BasketCard key={item.id} item={item} user={user!} />
        ))}

        {/* Repeat this structure for each product in the cart */}
      </div>

      {/* Order summary */}
      <div className="mt-8 bg-white p-6 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-4">주문 요약</h2>
        <div className="flex justify-between mb-2">
          <span>상품 금액</span>
          <span>￦{curTotal}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>배송비</span>
          <span>￦5,000</span>
        </div>
        <hr className="my-2 border-t" />
        <div className="flex justify-between">
          <span className="font-bold">총 결제 금액</span>
          <span className="font-bold">￦{total}</span>
        </div>
        <button
          className="mt-4 bg-gray-500 text-white px-6 py-3 rounded-md buttonEffect"
          onClick={completeOrderHandler}
        >
          주문 완료
        </button>
      </div>
    </div>
  );
};

export default MyProductBasket;
