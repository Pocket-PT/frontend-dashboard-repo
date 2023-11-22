'use client';

import AfterUserHistory from '@/components/AfterUserHistory';
import BeforeUserHistory from '@/components/BeforeUserHistory';
import UserChart from '@/components/UserChart';
import { useAccountQuery } from '@/custom-queries/useAccountQuery';
import useHistoryQuery from '@/custom-queries/useHistoryQuery';
import useHistoryStore from '@/stores/history';
import numberWithCommas from '@/utils/numberWithCommas';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const MemeberDetailPage = () => {
  const { data: myData } = useAccountQuery();
  const trainerId = myData?.data?.accountId;
  const params = useSearchParams();
  const name = params.get('name');
  const traineeId = params.get('traineeId');
  const phoneNumber = params.get('phoneNumber');
  const startDate = params.get('startDate');
  const expiredDate = params.get('expiredDate');
  const process = params.get('process');
  const paymentAmount = params.get('paymentAmount');
  const purpose = params
    .get('purpose')
    ?.split('+3+')
    .map((v) => {
      return {
        title: v.split('+$+')[0],
        content: v.split('+$+')[1],
        dday: v.split('+$+')[2],
      };
    });
  const { validHistory, setValidHistory } = useHistoryStore();
  const { data: historyData } = useHistoryQuery(
    trainerId,
    traineeId ? +traineeId : 0,
    '1980-01-01',
    '3000-01-01',
    'all',
    {
      select: (data) => data.data,
      enabled: !!trainerId && !!traineeId,
    },
  );
  const mockInbodyData = [
    {
      title: '체중',
      value: '65kg',
    },
    {
      title: '골격근량',
      value: '32.6',
    },
    {
      title: '체지방량',
      value: '4.3',
    },
    {
      title: 'BMI',
      value: '20.4',
    },
    {
      title: '체지방률',
      value: '7.0',
    },
  ];

  useEffect(() => {
    if (historyData?.data) {
      setValidHistory(
        historyData.data.map((el) => {
          return {
            value: dayjs(el.date).format('YYYY-MM-DD'),
            label: dayjs(el.date).format('YYYY-MM-DD'),
          };
        }),
      );
    }
  }, [historyData]);
  console.log('validHistory', validHistory);
  console.log('ids', trainerId, traineeId);
  console.log('days', startDate, expiredDate);

  return (
    <div className="w-full h-fit p-9">
      <div className="w-full bg-white border border-stone-300 rounded relative p-8">
        <div className="right-2 top-6 px-8 absolute flex w-full flex-row justify-between">
          <Link href="/">
            <div className="text-gray-300 hover:text-black hover:cursor-pointer">
              <svg
                width="18"
                height="29"
                viewBox="0 0 18 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 25.5925L6.87449 14.5L18 3.4075L14.5749 0L0 14.5L14.5749 29L18 25.5925Z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </Link>
          <button className="h-10 flex justify-center items-center bg-red-600 rounded-lg">
            <div className="w-[110px]">
              <div className="text-center text-white text-sm font-bold leading-tight">
                해지하기
              </div>
            </div>
          </button>
        </div>
        <div className="flex gap-8 items-center mt-10">
          <div className="w-24 h-24 relative">
            <Image src={'/images/profile-none.png'} fill alt="profile" />
          </div>
          <div className="space-y-3">
            <div className="">
              <span className="text-zinc-800 text-xl font-bold">
                {name}{' '}
                <span className="text-indigo-400 text-xs font-bold">
                  {process}개월{' '}
                  <span className="text-zinc-800">동안 PT진행중</span>
                </span>
              </span>
              <span className="text-neutral-500 text-base font-normal ml-20 mr-2">
                핸드폰번호
              </span>
              <span className="text-zinc-800 text-base font-semibold">
                {phoneNumber}
              </span>
            </div>
            <div className="w-[110px] h-10 relative rounded-lg border border-indigo-400 flex justify-center items-center">
              <div className="text-center text-indigo-400 text-sm font-bold leading-tight">
                채팅 보내기
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14">
          <div className="text-zinc-800 text-xl font-bold">체성분</div>
          <div className="w-full h-[1px] bg-slate-200 mt-2 mb-16" />
          <div className="flex flex-row space-x-10">
            <div className="h-[213px]">
              <UserChart name="김일곤" isDownLoad={true} />
            </div>
            <div className="grid grid-cols-2 gap-x-10 h-[180px] my-auto items-center">
              {mockInbodyData.map((el) => {
                return (
                  <div key={el.title} className="flex flex-row gap-2">
                    <div className="text-neutral-500 text-base font-normal">
                      {el.title}
                    </div>
                    <div className="text-zinc-800 text-base font-semibold">
                      {el.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-14">
          <div className="text-zinc-800 text-xl font-bold">PT정보</div>
          <div className="w-full h-[1px] bg-slate-200 mt-2 mb-5" />
          <div className="flex flex-row space-x-10">
            <div className="flex flex-row gap-12 my-auto items-center">
              <div className="flex flex-row gap-2">
                <div className="text-neutral-500 text-base font-normal">
                  신청내역
                </div>
                <div className="text-zinc-800 text-base font-semibold">
                  3개월
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-neutral-500 text-base font-normal">
                  남은개월
                </div>
                <div className="text-zinc-800 text-base font-semibold">
                  1개월
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-neutral-500 text-base font-normal">
                  등록일자
                </div>
                <div className="text-zinc-800 text-base font-semibold">
                  {startDate}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-neutral-500 text-base font-normal">
                  만료일자
                </div>
                <div className="text-zinc-800 text-base font-semibold">
                  {expiredDate}
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="text-neutral-500 text-base font-normal">
                  금액
                </div>
                <div className="text-zinc-800 text-base font-semibold">
                  {numberWithCommas(paymentAmount ? +paymentAmount : 0)}원
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-14">
          <div className="text-zinc-800 text-xl font-bold">목표</div>
          <div className="w-full h-[1px] bg-slate-200 mt-2 mb-5" />
          <div className="flex flex-row space-x-10">
            <div className="flex flex-row gap-12 my-auto items-center w-full">
              {purpose?.map((el, i) => {
                return (
                  <div
                    className="flex flex-row gap-2 w-full justify-between"
                    key={i}
                  >
                    <div className="flex flex-row">
                      <div className="relative w-8 h-8 mr-2 bg-zinc-300 rounded-full flex justify-center items-center">
                        <Image
                          src="/images/flag-icon.png"
                          alt="pt-goal"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div>
                        <div className="text-zinc-800 text-xs font-bold">
                          {el.title}
                        </div>
                        <div className="text-neutral-500 text-xs font-normal">
                          {el.content}
                        </div>
                      </div>
                    </div>

                    <div className="text-indigo-400 text-xl font-bold">
                      D
                      {+el.dday < 0 ? el.dday.replace('-', '+') : '-' + el.dday}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mt-14">
          <div className="text-zinc-800 text-xl font-bold">비포&애프터</div>
          <div className="w-full h-[1px] bg-slate-200 mt-2 mb-5" />
          <div className="flex flex-row space-x-2 w-full relative">
            <BeforeUserHistory
              pageRole={'before'}
              traineeId={traineeId}
              trainerId={trainerId}
              startDate={startDate}
              expiredDate={expiredDate}
            />
            <AfterUserHistory
              pageRole={'after'}
              traineeId={traineeId}
              trainerId={trainerId}
              startDate={startDate}
              expiredDate={expiredDate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeberDetailPage;
