import { useNavigate } from 'react-router-dom';
import { isLogin, signOut } from '../../firebase/userManage';
import { auth } from '../../firebase/firebase';
import { User } from '../../static/const/type';

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

  const handleLogOut = () => {
    signOut();
    navi('/');
  };
  return (
    <header className="absolute top-0 left-0 w-full">
      <div className="bg-blue-500 text-white py-8 text-center">
        <h1 onClick={() => navi('/')} className="text-4xl font-bold hover:cursor-pointer">
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
          <li>
            {/* <a href="/mypage/1" className="hover:text-gray-300">
              마이페이지
            </a> */}
            <button onClick={() => navi('/login')}>로그인</button>
          </li>
          <li>
            {/* <a href="/mypage/1" className="hover:text-gray-300">
              마이페이지
            </a> */}
            <button onClick={() => navi('/register')}>회원가입</button>
          </li>
        </ul>
        <div className="flex justify-end text-2">
          {info ? info.email : ''}
          {/* <div></div> */}
          <button
            onClick={handleLogOut}
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            로그아웃
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
