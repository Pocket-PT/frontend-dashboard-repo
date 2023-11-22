'use client';

import { useEffect } from 'react';
import useTokenStore from '@/stores/token';
import { redirect, useSearchParams } from 'next/navigation';

const AfterLogin = () => {
  const { setToken } = useTokenStore();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get('accessToken');
  console.log('accessToken: ', accessToken);
  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
      redirect('/login/check-signup');
    }
  }, [accessToken]);

  return <div>loading...</div>;
};

export default AfterLogin;
