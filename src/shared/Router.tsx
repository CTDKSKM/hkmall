import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from './Layout';
import MyPage from '../pages/MyPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import Login from '../components/Login';
import Register from '../components/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage/:uid" element={<MyPage />} />
          <Route path="/product/:pid" element={<ProductDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
