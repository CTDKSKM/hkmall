import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
  const navi = useNavigate();
  return (
    <header className="absolute top-0 left-0 w-full">
      <div className="bg-blue-500 text-white py-8 text-center">
        <h1 className="text-4xl font-bold">HK Mall</h1>
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;
