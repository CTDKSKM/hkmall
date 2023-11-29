import { useNavigate } from 'react-router-dom';
import { signOut } from '../../firebase/userManage';
import { auth } from '../../firebase/firebase';
import AdminController from './AdminController';
import { HK_USER } from '../../static/const/variable';
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import { useEffect } from 'react';
import { Category, User } from '../../static/const/type';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { currentUserState } from '../../atom/currentUserState';
import { currentCategory } from '../../atom/currentCategory';
import SearchBox from '../SearchPage/SearchBox';

type Props = {};

const Header = (props: Props) => {
  const navi = useNavigate();

  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  const setCategory = useSetRecoilState(currentCategory);

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
        <div className="sm:flex-col flex items-center bg-blue-500 text-white py-8 text-center">
          <div className="self-start pl-5">
            <h1 className="text-4xl font-bold hover:cursor-pointer" onClick={() => navi('/')}>
              HK Mall
            </h1>
          </div>

          <div className="self-center">
            <SearchBox />
          </div>
        </div>

        <nav className="bg-gray-800 text-white py-4 flex justify-between items-center px-5">
          <ul className="flex justify-between space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">
                홈
              </a>
            </li>
            {/* <li>
              <button onClick={() => navi('/product/1')}>상품페이지로</button>
            </li> */}
          </ul>

          {/* 상품 카테고리 메뉴 */}
          <ul className="flex justify-between space-x-4 bg-gray-700">
            <li>
              <button className="hover:text-gray-300" onClick={() => setCategory(Category.ALL)}>
                전체
              </button>
            </li>
            <li>
              <button className="hover:text-gray-300" onClick={() => setCategory(Category.HAT)}>
                모자
              </button>
            </li>
            <li>
              <button className="hover:text-gray-300" onClick={() => setCategory(Category.T_SHIRTS)}>
                티셔츠
              </button>
            </li>
            <li>
              <button className="hover:text-gray-300" onClick={() => setCategory(Category.TRAINING_CLOTHS)}>
                트레이닝복
              </button>
            </li>
          </ul>

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
        </nav>
      </header>
    </>
  );
};

export default Header;
