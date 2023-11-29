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
    <div>
      <h2 className="font-bold text-3xl">기본 회원 정보</h2>

      <div className="lg:w-4/5">
        <hr className="my-3" />
        <div className="flex">
          <p className="mr-3">사진</p>
          <img className="border-black border-2 rounded-t-lg" about="사진" alt="Hollywood Sign on The Hill" />
        </div>
        <hr className="my-3" />
        <div className="flex">
          <p className="mr-3">이메일</p>
          <p>{user?.email}</p>
        </div>
        <hr className="my-3" />
        <div className="flex">
          <p className="mr-3">비밀번호</p>
          <p>******</p>
        </div>
        <hr className="my-3" />
        <div className="flex">
          <p className="mr-3">닉네임</p>
          <p>####</p>
        </div>
        <hr className="my-3" />
        <div className="flex">
          <p className="mr-3">계정 생성날짜</p>
          <p>{user?.created_at}</p>
        </div>
        <hr className="my-3" />
      </div>
      <h2 className="text-lg font-bold text-3xl">나의 쇼핑 활동</h2>
      <hr className="my-3" />

      <div className="mt-5 flex">
        <div
          className="p-3 border-black border-2 font-bold hover:cursor-pointer hover:text-blue-500"
          onClick={() => navi('/mypage/like')}
        >
          좋아요
        </div>
        <div
          className="p-3 border-black border-2 font-bold hover:cursor-pointer hover:text-blue-500"
          onClick={() => navi('/mypage/basket')}
        >
          장바구니
        </div>
      </div>
    </div>
  );
};

export default MyInfoBox;
