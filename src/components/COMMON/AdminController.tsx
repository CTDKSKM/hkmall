import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

type Props = {};

const AdminController = (props: Props) => {
  const navigate = useNavigate();

  const [adminState, setAdminState] = useState<number>(0);
  const [adminString, setAdminString] = useState('');

  const handleAdminButton = () => {
    setAdminState((state) => state + 1);
  };

  useEffect(() => {
    const handleAdminEvent = (e: KeyboardEvent) => {
      setAdminString((string) => string + e.key);
    };
    if (adminState === +process.env.REACT_APP_ADMIN_STATE!) {
      document.addEventListener('keyup', handleAdminEvent);
    }
    if (adminString === process.env.REACT_APP_ADMIN_STRING) {
      document.removeEventListener('keyup', handleAdminEvent);
      const handleAdminPage = () => {
        const state = adminState;

        navigate('/admin', { state });
      };
      handleAdminPage();
    }

    return () => {
      document.removeEventListener('keyup', handleAdminEvent);
    };
  }, [adminState, adminString]);

  return (
    <button
      className="absolute top-0 left-0 w-1 h-1 bg-transparent cursor-pointer z-50"
      onClick={handleAdminButton}
    ></button>
  );
};

export default AdminController;
