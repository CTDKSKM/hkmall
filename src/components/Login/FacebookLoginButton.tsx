import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { auth } from '../../firebase/firebase';
import { useNavigate } from 'react-router-dom';

type Props = {};

const FacebookLoginButton = (props: Props) => {
  const navi = useNavigate();

  const LoginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    provider.addScope('public_profile');

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential!.accessToken;
        console.log('성공!', user, credential, accessToken);
        if (user) {
          // alert('로그인 완료!');
          navi('/');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log('실패==>', errorCode, errorMessage, credential);
        // ...
      });
  };

  return (
    <button onClick={LoginWithFacebook} type="button" className="socialLoginButton">
      <svg width="28" height="28" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none">
        <path
          fill="#1877F2"
          d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
        />
        <path
          fill="#ffffff"
          d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
        />
      </svg>
    </button>
  );
};

export default FacebookLoginButton;
