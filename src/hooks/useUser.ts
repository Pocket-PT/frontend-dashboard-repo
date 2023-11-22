'use client';

import { useEffect } from 'react';
import useTokenStore from '../stores/token';
import { useCheckSignupQuery } from '@/custom-queries/useCheckSignupQuery';
import { redirect } from 'next/navigation';

const useUser = () => {
  const { data, isLoading, isError, isSuccess } = useCheckSignupQuery();
  const { token } = useTokenStore();

  useEffect(() => {
    if (!token && !isLoading) {
      console.log('isLoading', isLoading);
      redirect('/login');
    }
    if (!data?.data.isAccountSignedUp && !isLoading) {
      console.log('2차 회원가입 안됨');
      redirect('/login');
    }
  }, [data?.data.isAccountSignedUp, isLoading]);

  return { data, isError, isLoading, isSuccess };
};

export default useUser;
