import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router';
import AdminNavigationBar from '../components/AdminPage/AdminNavigationBar';
import { adminNavigationComponentState } from '../atom/adminNavigationState';

type Props = {};

const AdminPage = (props: Props) => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const component = useRecoilValue(adminNavigationComponentState);

  // useEffect(() => {
  //   if (state !== +process.env.REACT_APP_ADMIN_STATE!) navigate('/');
  // }, [state]);

  // if (state !== 3) return <div>잘못된 접근입니다.</div>;

  return (
    <div>
      <AdminNavigationBar />
      <section className="absolute top-0 left-[200px] w-4/5 p-5">{component}</section>
    </div>
  );
};

export default AdminPage;
