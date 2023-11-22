'use client';

import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { getServerInstance } from './instance';
import { IOtherProfileKeys, otherProfileKeys } from '@/constants/querykey';
import { AxiosResponse } from 'axios';

export interface HistoryData {
  historicalDataId: number;
  date: string;
  accountId: number;
  title: string;
  description: string;
  historicalDataFileResponseMapperList: {
    historicalDataFileId: number;
    fileUrl: string;
    scope: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

interface IData {
  code: string;
  message: string;
  data: HistoryData[];
}

type HistoryReturnType<
  T extends (
    trainerId: number,
    traineeId: number,
    role: string,
    date: string,
  ) => unknown,
> = ReturnType<T>;
type OtherProfileKeyReturnType = HistoryReturnType<
  IOtherProfileKeys['history']
>;

const useHistoryQuery = <T = IData>(
  trainerId: number | undefined,
  traineeId: number | undefined,
  startDate: string | undefined,
  endDate: string | undefined,
  role: string,
  options?: Omit<
    UseQueryOptions<
      AxiosResponse<IData>,
      unknown,
      T,
      OtherProfileKeyReturnType
    >,
    'queryKey' | 'queryFn'
  >,
) => {
  const serverInstance = getServerInstance();
  const result = useQuery({
    queryKey: otherProfileKeys.history(
      trainerId,
      traineeId,
      role,
      startDate ?? '',
    ),
    queryFn: () =>
      serverInstance.get(
        `/api/v1/historical-data/trainer/${trainerId}/trainee/${traineeId}?startDate=${startDate}&endDate=${endDate}`,
      ),
    ...options,
    staleTime: Infinity,
    retry: 3,
  });

  return result;
};

export default useHistoryQuery;
