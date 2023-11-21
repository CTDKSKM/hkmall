import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';

type Props = {};

const AdminPage = (props: Props) => {
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state !== +process.env.REACT_APP_ADMIN_STATE!) navigate('/');
  }, [state]);

  if (state !== 3) return <div>잘못된 접근입니다.</div>;

  return <div>AdminPage</div>;
};

export default AdminPage;
