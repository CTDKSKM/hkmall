// userManage.ts

import 'firebase/auth';
import { auth } from './firebase';
import { User } from '../static/const/type';
import { HK_USER } from '../static/const/variable';

export const signOut = async () => {
  try {
    await auth.signOut();
    sessionStorage.removeItem(HK_USER);
    alert('로그아웃 완료!');
  } catch (error) {
    alert(error);
    console.error('Error signing out:', error);
    throw error;
  }
};

export const isLogin = () => {
  const userData = sessionStorage.getItem(HK_USER);
  return userData == null ? null : (JSON.parse(userData!) as User);
};
