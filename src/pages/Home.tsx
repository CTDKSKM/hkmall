import React from 'react';
import { PRODUCTS_DUMMY } from '../static/const/productsDummy';


type Props = {};

const Home = (props: Props) => {
  const dummy = PRODUCTS_DUMMY.concat(Array.from({ length: 1 }, () => PRODUCTS_DUMMY).flat());



  return (
    <body className="bg-gray-100">
      <div className="h-120 flex items-center justify-center">
        {/* 쇼핑몰 이미지 그리드 */}
        <div className="grid-cols-1 sm:grid md:grid-cols-4 ">
          {/* 카드 반복 */}

          {dummy.map((item, key) => (
            <div
              key={key}
              className="mx-3 mt-6 flex flex-col rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 sm:shrink-0 sm:grow sm:basis-0"
            >
              <a href="#!" className="overflow-hidden rounded-t-lg">
                <img
                  className="hover:scale-125 transition-transform duration-300"
                  src={item.imgs[0]}
                  alt="Hollywood Sign on The Hill"
                />
              </a>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                  {item.name}
                </h5>
                <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">{item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </body>
  );
};

export default Home;
