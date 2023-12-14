import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { SiTistory } from 'react-icons/si';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white p-4 h-[200px]">
      {/* 사이트 링크들 */}
      <div className="container mx-auto my-10 flex flex-col items-center justify-center">
        <div className="flex space-x-4 my-3">
          {/* 깃허브 */}
          <a href="#" rel="noopener noreferrer">
            <AiFillGithub className="w-[50px] h-[50px] footerIcon mx-1" />
          </a>
          {/* 티스토리 */}
          <a href="#" rel="noopener noreferrer">
            <SiTistory className="w-[40px] h-[40px] footerIcon mt-2  mx-1" />
          </a>
        </div>
        <p>© 2023. HK Mall. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
