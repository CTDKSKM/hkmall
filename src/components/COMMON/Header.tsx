import { useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase/userManage';
import { auth } from '../../firebase/firebase';
import AdminController from './AdminController';
import { HK_USER } from '../../static/const/variable';
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { useEffect } from 'react';
import { User } from '../../static/const/type';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../atom/currentUserState';

type Props = {};

const Header = (props: Props) => {
  const navi = useNavigate();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

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
    <>
      <AdminController />
      <header className="absolute top-0 left-0 w-full">
        <div className="bg-blue-500 text-white py-8 text-center">
          <h1 className="text-4xl font-bold hover:cursor-pointer" onClick={() => navi('/')}>
            HK Mall
          </h1>
        </div>

        <nav className="bg-gray-800 text-white py-4">
          <ul className="flex justify-center space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">
                홈
              </a>
            </li>
            <li>
              {/* <a href="/product/1" className="hover:text-gray-300">
              상품디테일페이지테스트
            </a> */}
              <button onClick={() => navi('/product/1')}>상품페이지로</button>
            </li>
            <li>
              {/* <a href="/mypage/1" className="hover:text-gray-300">
              마이페이지
            </a> */}
              <button onClick={() => navi('/mypage/1')}>마이</button>
            </li>
          </ul>
        </nav>

        <nav className="bg-gray-600 text-white text-end px-5 my">
          {currentUser ? (
            <>
              {currentUser.email}님, 환영합니다!{' '}
              <form onSubmit={signOut}>
                <button className="text-red ms-2">로그아웃</button>
              </form>
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
      </header>
    </>
  );
};

export default Header;
