'use client';

import { UseQueryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { getServerInstance } from './instance';
import { IMyProfileKeys, myprofileKeys } from '@/constants/querykey';
import { AxiosResponse } from 'axios';

export interface MemberData {
  ptMatchingId: number;
  status: string;
  subscriptionPeriod: number;
  paymentAmount: number;
  startDate: string;
  expiredDate: string;
  rejectReason: string;
  accountId: number;
  name: string;
  phoneNumber: string;
  email: string;
  profilePictureUrl: string;
}

interface IData {
  code: string;
  message: string;
  data: MemberData[];
}

type MemberReturnType<T extends () => unknown> = ReturnType<T>;
type MyProfileKeyReturnType = MemberReturnType<IMyProfileKeys['member']>;

const useSuspenseMemberQuery = <T = IData>(
  options?: Omit<
    UseQueryOptions<AxiosResponse<IData>, unknown, T, MyProfileKeyReturnType>,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  const result = useSuspenseQuery({
    queryKey: myprofileKeys.member(),
    queryFn: () => serverInstance.get(`/api/v1/matching?mode=active`),
    ...options,
    staleTime: Infinity,
    retry: 3,
  });

  return result;
};

export default useSuspenseMemberQuery;
