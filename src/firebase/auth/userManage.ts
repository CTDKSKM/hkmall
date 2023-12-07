// userManage.ts

import 'firebase/auth';
import { auth } from '../firebase';
import { HK_USER } from '../../static/const/variable';

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
