// userManage.ts

import 'firebase/auth';
import { auth } from './firebase';
import { User, createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword } from 'firebase/auth';

export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    alert('회원가입 완료!');
    window.location.href = '/login';
    return userCredential.user;
  } catch (error) {
    alert(error);
    console.error('Error signing up:', error);

    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    alert('로그인 완료!');

    return userCredential.user;
  } catch (error) {
    alert(error);
    console.error('Error signing in:', error);
    throw error;
  }
};

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
  return JSON.parse(userData!) as User;
  // return userData;
};

export const removeUser = async () => {
  try {
    await deleteUser(auth.currentUser!);
    localStorage.removeItem('user');
    alert('삭제 완료!');
  } catch (error) {
    alert(error);
    console.error('Error Delete User:', error);
    throw error;
  }
};
