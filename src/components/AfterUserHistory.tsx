'use client';

import { ConfigProvider, Carousel, Select } from 'antd';
import ko_KR from 'antd/locale/ko_KR';
import useHistoryQuery from '@/custom-queries/useHistoryQuery';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { otherProfileKeys } from '@/constants/querykey';
import useHistoryStore from '@/stores/history';

type UserPictureProps = {
  trainerId: number | undefined;
  traineeId: string | null;
  startDate: string | null;
  expiredDate: string | null;
  pageRole: string;
};

const AfterUserHistory = ({
  trainerId,
  traineeId,
  pageRole,
}: UserPictureProps) => {
  const { validHistory } = useHistoryStore();
  const [historyLoading, setHistoryLoading] = useState(true);
  const [date, setDate] = useState<string | undefined>();
  const queryClient = new QueryClient();
  const { data, refetch } = useHistoryQuery(
    trainerId,
    traineeId ? +traineeId : 0,
    date,
    date,
    pageRole,
    {
      select: (data) => data.data,
      enabled: !!trainerId && !!traineeId,
    },
  );

  useEffect(() => {
    if (validHistory.length) {
      setHistoryLoading(false);
      setDate(validHistory.at(-1)?.value);
    }
  }, [validHistory]);

  const handleChange = async (value: string) => {
    console.log(`selected ${value}`);
    setDate(value);
    await queryClient.invalidateQueries({
      queryKey: otherProfileKeys.history(
        trainerId,
        traineeId ? +traineeId : 0,
        pageRole,
        date ?? '',
      ),
    });
    await refetch();
  };

  console.log('validHistory: ', validHistory);
  console.log('historyLoading: ', historyLoading);
  console.log('date', date);

  return (
    <div className="space-y-3 w-1/2">
      <ConfigProvider locale={ko_KR}>
        <div className="w-full flex justify-center">
          <Select
            defaultValue={'날짜를 선택해주세요.'}
            onChange={handleChange}
            options={validHistory}
          />
        </div>
      </ConfigProvider>
      <Carousel>
        {historyLoading ? (
          <div>loading...</div>
        ) : (
          data?.data.map((item) => {
            return item.historicalDataFileResponseMapperList.map((file) => {
              return (
                <div
                  className="w-full h-[435px] relative flex justify-center items-center"
                  key={file.historicalDataFileId}
                >
                  <Image
                    src={file.fileUrl}
                    alt="user-picture"
                    fill
                    objectFit="contain"
                  />
                </div>
              );
            });
          })
        )}
      </Carousel>
    </div>
  );
};

export default AfterUserHistory;
