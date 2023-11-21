import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { removeUser, signOut } from '../firebase/userManage';

type Props = {};

const MyPage = (props: Props) => {
  const navi = useNavigate();
  const { uid } = useParams();
  

  const handleDeleteUser = () => {
    removeUser();
    navi('/');
  };

  return (
    <>
      <div className="h-[300px] w-full">MyPage</div>
    
      <button
        onClick={handleDeleteUser}
        type="button"
        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        계정 삭제
      </button>
    </>
  );
};

export default MyPage;
