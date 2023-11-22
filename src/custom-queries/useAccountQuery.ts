import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { getServerInstance } from './instance';
import { AxiosResponse } from 'axios';
import { myprofileKeys } from '@/constants/querykey';

export interface AccountData {
  accountId: number;
  role: string;
  provider: string;
  email: string;
  name: string;
  phoneNumber: string;
  nickname: string;
  profilePictureUrl: string;
  gender: null;
  birthdate: null;
  introduce: string;
  identificationCode: string;
  totalSales: number;
  purposeList: unknown[];
  careerList: {
    careerId: number;
    type: string;
    title: string;
    date: string;
  }[];
}

//useAccountQuery 훅의 반환 타입을 정의
export type AccountQueryResult = UseQueryResult<
  AxiosResponse<AccountData>,
  unknown
>;

export const useAccountQuery = (): AccountQueryResult => {
  const serverInstance = getServerInstance();
  const result = useQuery({
    queryKey: myprofileKeys.account(),
    queryFn: () => serverInstance.get('/api/v1/account/detail'),
    select: (response: AxiosResponse) => response.data,
    //5분동안 캐시를 유지하고, 0번 재시도
    staleTime: 1000 * 60 * 5,
    retry: 0,
  });

  return result;
};
