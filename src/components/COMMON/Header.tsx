import { useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase/userManage';
import { auth } from '../../firebase/firebase';
import AdminController from './AdminController';
import { HK_USER } from '../../static/const/variable';
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { useEffect } from 'react';
import { Category, User } from '../../static/const/type';
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../atom/currentUserState';
import { currentCategory } from '../../atom/currentCategory';

type Props = {};

const Header = (props: Props) => {
  const navi = useNavigate();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const [_, setCategory] = useRecoilState(currentCategory);

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

        <nav className="bg-gray-800 text-white py-4 flex justify-between items-center px-5">
          <ul className="flex justify-between space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">
                홈
              </a>
            </li>
            <li>
              <button onClick={() => navi('/product/1')}>상품페이지로</button>
            </li>
            <li>
              <button onClick={() => navi('/mypage/1')}>마이</button>
            </li>
          </ul>

          {/* 상품 카테고리 메뉴 */}
          <ul className="flex justify-between space-x-4 bg-gray-700">
            <li>
              <button className="hover:text-gray-300" onClick={() => setCategory(Category.전체)}>
                전체
              </button>
            </li>
            <li>
              <button className="hover:text-gray-300" onClick={() => setCategory(Category.모자)}>
                모자
              </button>
            </li>
            <li>
              <button className="hover:text-gray-300" onClick={() => setCategory(Category.티셔츠)}>
                티셔츠
              </button>
            </li>
            <li>
              <button className="hover:text-gray-300" onClick={() => setCategory(Category.트레이닝복)}>
                트레이닝복
              </button>
            </li>
          </ul>

          <div>
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
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
