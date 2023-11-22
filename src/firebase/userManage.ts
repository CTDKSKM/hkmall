// userManage.ts

import 'firebase/auth';
import { auth } from './firebase';
import { User } from '../static/const/type';

export const signOut = async () => {
  try {
    await auth.signOut();
    localStorage.removeItem('user');
    alert('로그아웃 완료!');
  } catch (error) {
    alert(error);
    console.error('Error signing out:', error);
    throw error;
  }
};

export const isLogin = () => {
  const userData = localStorage.getItem('user');
  return userData == null ? null : (JSON.parse(userData!) as User);
};
