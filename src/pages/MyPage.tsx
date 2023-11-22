import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { removeUser, signOut } from '../firebase/userManage';
import { deleteUser } from 'firebase/auth';
import { auth } from '../firebase/firebase';

type Props = {};

const MyPage = (props: Props) => {
  const navi = useNavigate();
  const { uid } = useParams();

  const confirmDelete = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      await deleteUser(auth.currentUser!);
      localStorage.removeItem('user');
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
      <div className="h-[300px] w-full">MyPage</div>
      <form onSubmit={confirmDelete}>
        <button
          onClick={handleDeleteUser}
          type="button"
          className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          계정 삭제
        </button>
      </form>
    </>
  );
};

export default MyPage;
