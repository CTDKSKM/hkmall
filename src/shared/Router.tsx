import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Layout from './Layout';
import MyPage from '../pages/MyPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import Login from '../pages/Login';
import Register from '../components/Register';
import AdminPage from '../pages/AdminPage';
import SearchPage from '../pages/SearchPage';
import MyProductLike from '../pages/MyProductLike';
import MyProductBasket from '../pages/MyProductBasket';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:code" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mypage/:uid" element={<MyPage />} />
          <Route path="/mypage/like" element={<MyProductLike />} />
          <Route path="/mypage/basket" element={<MyProductBasket />} />
          <Route path="/products/:pid" element={<ProductDetailPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Route>
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default Router;
