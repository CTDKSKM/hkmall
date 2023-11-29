import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { removeUser, signOut } from '../firebase/userManage';
import { deleteUser } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { HK_USER } from '../static/const/variable';
import { AiFillHeart, AiFillShopping } from 'react-icons/ai';
import { currentUserState } from '../atom/currentUserState';
import { useRecoilValue } from 'recoil';

type Props = {};

const MyPage = (props: Props) => {
  const navi = useNavigate();
  const { uid } = useParams();
  const user = useRecoilValue(currentUserState);

  const confirmDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await deleteUser(auth.currentUser!);
      sessionStorage.removeItem(HK_USER);
      alert('삭제 완료!');
    } catch (error) {
      alert(error);
      console.error('Error Delete User:', error);
      throw error;
    }

    navi('/');
  };

  const handleDeleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    /* eslint-disable no-restricted-globals */
    if (confirm('정말 삭제합니까?')) {
      confirmDelete(e);
    } else {
      return;
    }
  };

  return (
    <>
      {/* <div className="h-[300px] w-full">MyPage</div> */}

      <div className="lg:w-1/3 h-screen mt-10">
        <h2 className="text-lg font-bold text-3xl">기본 회원 정보</h2>

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

        <form onSubmit={confirmDelete}>
          <button
            onClick={handleDeleteUser}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            계정 삭제
          </button>
        </form>
      </div>
    </>
  );
};

export default MyPage;
