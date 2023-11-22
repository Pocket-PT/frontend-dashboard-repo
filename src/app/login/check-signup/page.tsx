'use client';

import { useCheckSignupQuery } from '@/custom-queries/useCheckSignupQuery';
import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import useTokenStore from '@/stores/token';
const CheckSignup = () => {
  const { isLoading, isError, data: userData } = useCheckSignupQuery();
  const { token } = useTokenStore();

  useEffect(() => {
    console.log(isLoading, isError, userData, token);
    if (isLoading) return;
    console.log('token: ', token);
    if (userData?.data.isAccountSignedUp) {
      redirect('/');
    } else {
      redirect('/login');
    }
  }, [isError, isLoading, userData]);

  if (isLoading || isError) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>CheckSignup</h1>
    </div>
  );
};

export default CheckSignup;
