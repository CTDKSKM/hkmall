import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../atom/currentUserState';

type Props = {};

const MyInfoBox = (props: Props) => {
  const navi = useNavigate();
  const { uid } = useParams();
  const user = useRecoilValue(currentUserState);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="font-bold text-3xl mb-4">기본 회원 정보</h2>

      <div className="bg-white p-6 rounded-md shadow-md">
        <div className="flex items-center mb-4">
          <p className="font-semibold mr-3">이메일:</p>
          <p>{user?.email}</p>
        </div>
        <hr className="my-2" />
        <div className="flex items-center mb-4">
          <p className="font-semibold mr-3">비밀번호:</p>
          <p>******</p>
        </div>
        <hr className="my-2" />
        <div className="flex items-center mb-4">
          <p className="font-semibold mr-3">계정 생성날짜:</p>
          <p>{user?.created_at}</p>
        </div>
      </div>

      <h2 className="text-lg font-bold mt-6">나의 쇼핑 활동</h2>
      <hr className="my-2" />

      <div className="my-5 flex">
        <div
          className="p-3 bg-white border border-gray-300 rounded-md font-bold cursor-pointer hover:text-blue-500 mr-4"
          onClick={() => navi('/mypage/like')}
        >
          좋아요
        </div>
        <div
          className="p-3 bg-white border border-gray-300 rounded-md font-bold cursor-pointer hover:text-blue-500"
          onClick={() => navi('/mypage/basket')}
        >
          장바구니
        </div>
      </div>
    </div>
  );
};

export default MyInfoBox;
