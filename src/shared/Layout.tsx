import React from 'react';
import Header from '../components/COMMON/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../components/COMMON/Footer';

const Layout = () => {
  return (
    <div>
      <Header />
      <main className="w-4/5 mx-auto sm:w-4/5 lg:w-3/5">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
