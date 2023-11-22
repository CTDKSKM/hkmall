import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { adminNavigationComponentState } from '../../atom/adminNavigationState';
import { ADMIN_NAVIGATION_DATA } from '../../static/const/adminNavigationData';
import { useNavigate } from 'react-router-dom';

type Props = {};

const AdminNavigationBar = (props: Props) => {
  const navigationData = ADMIN_NAVIGATION_DATA;
  const navigate = useNavigate();
  const setNavigationState = useSetRecoilState(adminNavigationComponentState);

  const handleNavigationComponentButton = (component: JSX.Element) => {
    setNavigationState(component);
  };

  useEffect(() => {
    setNavigationState(navigationData[0].values[0].component);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-[200px] bg-slate-200 min-h-full">
      {navigationData.map((data, idx) => {
        return (
          <div key={idx}>
            <p>{data.name}</p>
            <ul className="flex flex-col gap-3">
              {data.values.map((value) => {
                return (
                  <li key={value.name}>
                    <button
                      className="w-full h-10 p-2 bg-slate-100"
                      onClick={() => {
                        if (value.action) {
                          navigate('/');
                          return;
                        }
                        handleNavigationComponentButton(value.component);
                      }}
                    >
                      {value.name}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default AdminNavigationBar;
