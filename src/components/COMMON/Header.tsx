import AdminController from './AdminController';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { category, currentCategory } from '../../atom/currentCategory';
import SearchBox from '../SearchPage/SearchBox';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginInfoBox from './LoginInfoBox';
import { Link } from 'react-router-dom';

type Props = {};

const Header = (props: Props) => {
  const navi = useNavigate();
  const setCategory = useSetRecoilState(currentCategory);
  const current = useRecoilValue(currentCategory);
  const currentPath = useLocation().pathname;
  console.log(currentPath);

  return (
    <>
      <AdminController />
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
            <li>
              <Link to="/" className="hover:text-gray-300">
                홈
              </Link>
            </li>
          </ul>

          {/* 상품 카테고리 메뉴 */}
          {currentPath === '/' ? (
            <ul className="flex justify-between space-x-4 bg-gray-700">
              {Object.entries(category)
                .map(([id, name]) => ({ id, name }))
                .map((val, idx) => {
                  return (
                    <li key={idx}>
                      <button
                        className={`hover:text-gray-300 ${val.name === current ? 'underline' : 'null'}`}
                        onClick={() => setCategory(val.name)}
                      >
                        {val.name}
                      </button>
                    </li>
                  );
                })}
            </ul>
          ) : null}

          <LoginInfoBox />
        </nav>
      </header>
    </>
  );
};

export default Header;
