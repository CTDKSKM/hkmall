// import AdminController from './AdminController';

import { category } from '../../atom/currentCategory';
import SearchBox from '../SearchPage/SearchBox';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginInfoBox from './LoginInfoBox';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

type Props = {};

const Header = (props: Props) => {
  const navi = useNavigate();

  const location = useLocation();

  const [path, setPath] = useState('');
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  return (
    <>
      <header className="absolute top-0 left-0 w-full">
        <div className="sm:flex-col flex items-center bg-gray-600 text-white py-8 text-center">
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
            <li className="hidden md:block">
              <Link to="/" className="hover:text-gray-300">
                홈
              </Link>
            </li>
          </ul>

          {/* 상품 카테고리 메뉴 */}

          <ul className="flex justify-between space-x-4 bg-gray-700">
            {Object.entries(category)
              .map(([id, name]) => ({ id, name }))
              .map((val, idx) => {
                return (
                  <li key={idx}>
                    <Link
                      to={`/${val.id}`}
                      className={`hover:text-gray-300 ${path.includes(val.id) ? 'underline' : 'null'}`}
                    >
                      {val.name}
                    </Link>
                  </li>
                );
              })}
          </ul>

          <LoginInfoBox />
        </nav>
      </header>
    </>
  );
};

export default Header;
