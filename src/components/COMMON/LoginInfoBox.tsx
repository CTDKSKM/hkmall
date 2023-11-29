import React, { useEffect } from 'react';
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { signOut } from '../../firebase/userManage';
import { User } from '../../static/const/type';
import { useRecoilState } from 'recoil';
import { auth } from '../../firebase/firebase';
import { currentUserState } from '../../atom/currentUserState';
import { HK_USER } from '../../static/const/variable';
import { useNavigate } from 'react-router-dom';

type Props = {};

const LoginInfoBox = (props: Props) => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const navi = useNavigate();

  useEffect(() => {
    // 인증 상태 지속성을 세션으로 설정합니다.
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        return onAuthStateChanged(auth, (user) => {
          if (user) {
            const curretUser = {
              uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              created_at: user.metadata.creationTime
            } as User;

            sessionStorage.setItem(HK_USER, JSON.stringify(curretUser));
            setCurrentUser(curretUser);
            // console.log('User is logged in:', user);
          } else {
            sessionStorage.removeItem(HK_USER);
            setCurrentUser(null);
            // console.log('User is logged out:', user);
          }
        });
      })
      .catch((error) => {
        // Handle errors
        console.error('Error setting persistence:', error);
      });
  }, []);

  return (
    <div>
      <nav className="bg-gray-600 text-white text-end px-5 my">
        {currentUser ? (
          <>
            {currentUser.email}님, 환영합니다!{' '}
            <div className="flex justify-end">
              <button className="text-red ms-2 bg-gray-500" onClick={() => navi('/mypage/1')}>
                마이페이지
              </button>
              <form onSubmit={signOut}>
                <button className="text-red ms-2 bg-red-800">로그아웃</button>
              </form>
            </div>
          </>
        ) : (
          <>
            로그인 정보 없음
            <button className="text-blue ms-3" onClick={() => navi('/login')}>
              로그인
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default LoginInfoBox;
