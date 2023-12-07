import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import FacebookLoginButton from '../components/Login/FacebookLoginButton';
import GoogleLoginButton from '../components/Login/GoogleLoginButton';
import InputField from '../components/COMMON/InputField';
import Logo from '../assets/images/logo.png';
import debounce from 'lodash/debounce';

type Props = {};

const Login = (props: Props) => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const navi = useNavigate();

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const passHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPass(e.target.value);
  };
  const confirmLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, pass);

      const user = userCredential.user;
      alert('로그인 완료!');
      navi('/');
    } catch (error) {
      alert('로그인 실패!');
      console.error('Error signing in:', error);
      return;
    }
  };

  return (
    <section className="h-screen">
      <div className="h-full">
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img src={Logo} className="mw-[300px]" alt="Sample image" />
          </div>

          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={debounce(confirmLogin, 250)}>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="mb-0 mr-4 text-lg">Sign in with</p>
                <FacebookLoginButton />

                <GoogleLoginButton />
              </div>

              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white">Or</p>
              </div>

              {/* 이메일 입력란 */}
              <InputField
                label="이메일"
                type="email"
                value={email}
                onChange={emailHandler}
                placeholder="이메일"
                required
              />
              {/* 패스워드 입력란 */}
              <InputField
                label="패스워드"
                type="password"
                value={pass}
                onChange={passHandler}
                placeholder="••••••"
                required
              />

              <div className="text-center lg:text-left">
                <button className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">로그인</button>

                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  계정이 없으신가요?
                  <a href="/register" className="font-medium text-gray-600 dark:text-blue-500 hover:underline">
                    회원가입
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
