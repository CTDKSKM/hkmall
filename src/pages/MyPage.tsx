import React from 'react';
import { useParams } from 'react-router-dom';

type Props = {};

const MyPage = (props: Props) => {
  const { uid } = useParams();

  return <div className="h-[300px] w-full">MyPage</div>;
};

export default MyPage;
