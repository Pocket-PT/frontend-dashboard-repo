'use client';

import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getServerInstance } from './instance';
import { AxiosResponse } from 'axios';
import { myprofileKeys } from '@/constants/querykey';

interface SignupData {
  isAccountSignedUp: boolean;
  defaultName: string;
}

// interface ErrorData {
//   code: string;
//   message: string;
//   errors?: [];
// }

// const NOT_SIGNUP_MEESAGE = 'JWT 유효성 예외 발생 - 만료된 JWT Token' as const;

//useAccountQuery 훅의 반환 타입을 정의
type SignupQueryResult = UseQueryResult<AxiosResponse<SignupData>, unknown>;

export const useCheckSignupQuery = (): SignupQueryResult => {
  const serverInstance = getServerInstance();
  const result = useQuery({
    queryKey: myprofileKeys.signup(),
    queryFn: () => serverInstance.get('/api/v1/account/check/signup'),
    select: (response: AxiosResponse) => response.data,
    retry: 0,
    //catch 401 error
    // onError: (error: AxiosError<ErrorData>) => {
    //   if (
    //     error.response?.status === 401 &&
    //     error.response.data.message === NOT_SIGNUP_MEESAGE
    //   ) {
    //     console.log('401 error');
    //   }
    // },
  });

  return result;
};
