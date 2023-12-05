import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router';
import AdminNavigationBar from '../components/AdminPage/AdminNavigationBar';
import { adminNavigationComponentState } from '../atom/adminNavigationState';
import { auth } from '../firebase/firebase';

type Props = {};

const AdminPage = (props: Props) => {
  const navigate = useNavigate();
  const component = useRecoilValue(adminNavigationComponentState);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (
        !user ||
        (user && ![process.env.REACT_APP_ADMIN_UID_1, process.env.REACT_APP_ADMIN_UID_2].includes(user.uid))
      ) {
        navigate('/');
      } else {
        setIsAdmin(true);
      }
    });
  }, []);

  if (!isAdmin) return <></>;
  return (
    <div>
      <AdminNavigationBar />
      <section className="absolute top-0 left-[200px] w-4/5 p-5">{component}</section>
    </div>
  );
};

export default AdminPage;
