import React from 'react';

type Props = {};

const KakaoLoginButton = (props: Props) => {
  // SDK를 초기화 합니다. 사용할 앱의 JavaScript 키를 설정해야 합니다.
  const CLIENT_ID = `${process.env.REACT_APP_KAKAO_KEY}`;
  const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginWithKakao = () => {
    window.location.href = kakaoURL;
  };
  //   로그인 코드 값
  const code = new URL(window.location.href).searchParams.get('code');
  //   console.log(code)

  return (
    <button onClick={loginWithKakao}>
      <img
        src="https://k.kakaocdn.net/14/dn/btroDszwNrM/I6efHub1SN5KCJqLm1Ovx1/o.jpg"
        width="222"
        alt="카카오 로그인 버튼"
      />
    </button>
  );
};

export default KakaoLoginButton;
