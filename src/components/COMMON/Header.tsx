import { useNavigate } from 'react-router-dom';
import { isLogin, signOut } from '../../firebase/userManage';
import { auth } from '../../firebase/firebase';
import { User } from '../../static/const/type';
import AdminController from './AdminController';

type Props = {};

const Header = (props: Props) => {
  const navi = useNavigate();

  const info = isLogin();

  auth.onAuthStateChanged((user) => {
    if (user) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        } as User)
      );
    } else {
      localStorage.removeItem('user');
    }
    console.log(JSON.parse(localStorage.getItem('user')!));
  });

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
          {info ? (
            <>
              {info.email}님, 환영합니다!{' '}
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
