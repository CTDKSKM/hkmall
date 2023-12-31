import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { HK_USER } from '../static/const/variable';

import MyInfoBox from '../components/MyInfoBox';

type Props = {};

const MyPage = (props: Props) => {
  const navi = useNavigate();

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
      <div className="lg:w-1/3 h-5/6 mt-10">
        <MyInfoBox />

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
