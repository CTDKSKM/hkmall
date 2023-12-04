import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { FirebaseError } from 'firebase/app';

import AlertIndicator from './COMMON/AlertIndicator';

type Props = {};

const Register = (props: Props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [rePass, setRePass] = useState('');
  const navi = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };
  const rePassHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRePass(e.target.value);
  };

  const confirmRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, pass);
      alert('회원가입 완료!');
      navi('/login');

      signOut(auth);
    } catch (e) {
      const error = e as FirebaseError;

      switch (error.code) {
        case 'auth/weak-password':
          setErrorMessage('6자리 이상의 비밀번호를 입력해주시오.');
          break;
        case 'auth/invalid-email': {
          setErrorMessage('유효한 이메일을 사용해주세요.');
          break;
        }
        case 'auth/email-already-in-use':
          setErrorMessage('이미 사용중인 이메일입니다.');
          break;
      }
    }
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
    <form onSubmit={confirmRegister} className="h-[1000px]">
      {errorMessage && <AlertIndicator>{errorMessage}</AlertIndicator>}
      {/* 이메일 입력란 */}
      <div className="mb-6 justify-center items-center">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">이메일</label>
        <input
          onChange={emailHandler}
          value={email}
          type="email"
          id="email"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-gray-500 dark:focus:border-gray-500 dark:shadow-sm-light"
          placeholder="이메일"
          required
        />
      </div>
      {/* 패스워드 입력란 */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">패스워드</label>
        <input
          onChange={passHandler}
          value={pass}
          type="password"
          id="password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      {/* 확인 패스워드 입력란 */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">패드워드 확인</label>
        <input
          onChange={rePassHandler}
          value={rePass}
          type="password"
          id="repeat-password"
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
          required
        />
      </div>
      {/* 가입 조항 체크박스 */}
      {/* <div className="flex items-start mb-6">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            value=""
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
            required
          />
        </div>
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          I agree with the{' '}
          <a href="#" className="text-blue-600 hover:underline dark:text-blue-500">
            terms and conditions
          </a>
        </label>
      </div> */}
      <button
        type="submit"
        className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        회원가입
      </button>
    </form>
  );
};

export default Register;
