'use client';

import SkeletonTable from '@/components/SkeletonTable';
import UserChart from '@/components/UserChart';
import UserTable from '@/components/UserTable';
import useMemeberQuery, { MemberData } from '@/custom-queries/useMemberQuery';
import useOtherProfileQuery, {
  IOtherProfileData,
} from '@/custom-queries/useOtherProfileQuery';
import useUser from '@/hooks/useUser';
import { calculateProgress } from '@/utils/calculateProcess';
import { cls } from '@/utils/cls';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function MembersPage() {
  useUser();
  const statusOrder = ['pending', 'active', 'expired', 'rejected'];
  const { data, isLoading } = useMemeberQuery({
    select: (data) => {
      return {
        ...data.data,
        data: data.data.data
          .sort(
            (a, b) =>
              statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status),
          )
          .map((member) => {
            return {
              ...member,
              key: member.ptMatchingId,
              process: calculateProgress(member.startDate, member.expiredDate),
            };
          }),
      };
    },
  });
  const [accountId, setAccountId] = useState(0);
  const [ptMatchingId, setPtMatchingId] = useState(0);
  const { data: profileData } = useOtherProfileQuery(accountId);
  const selectMemberData = data?.data.find((member) => {
    return member.ptMatchingId === ptMatchingId;
  });
  const [dataSource, setDataSource] = useState(data?.data);
  useEffect(() => {
    setDataSource(data?.data);
  }, [data]);
  const onSearchByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const filteredData = data?.data.filter((member) => {
      return member.name.includes(value);
    });
    setDataSource(filteredData);
  };
  //`calc(100vh - ${refHeights[0]}px - ${refHeights[1]}px - 11rem)`

  return (
    <div className="h-full overflow-hidden flex flex-col gap-4">
      <div>
        <div className="w-full flex flex-row justify-between items-center mb-2">
          <div className="space-x-2">
            <span className="text-zinc-800 text-base font-bold">회원목록</span>
            <span className="text-stone-500 text-sm font-normal">
              총 {data?.data.length}명
            </span>
          </div>
          <div className="group">
            <div className="border transform duration-300 ease-in-out border-gray-300 w-[154px] pl-2 pr-1 py-1 text-gray-500 flex flex-row items-center justify-between border-t-0 border-l-0 border-r-0 space-x-1 group-focus-within:border-black">
              <input
                type="text"
                className="w-full group-focus-within:outline-none bg-transparent"
                placeholder="이름검색"
                onChange={(e) => onSearchByName(e)}
              />
              <div className="group-focus:text-black text-gray-300 group-focus-within:text-black transform duration-300 ease-in-out">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.875 2.625C4.52779 2.625 2.625 4.52779 2.625 6.875C2.625 9.22221 4.52779 11.125 6.875 11.125C8.01683 11.125 9.0535 10.6747 9.8171 9.94202C9.83518 9.91913 9.85479 9.89705 9.87592 9.87592C9.89705 9.85479 9.91913 9.83518 9.94202 9.8171C10.6747 9.0535 11.125 8.01683 11.125 6.875C11.125 4.52779 9.22221 2.625 6.875 2.625ZM11.4367 10.376C12.1819 9.40641 12.625 8.19245 12.625 6.875C12.625 3.69936 10.0506 1.125 6.875 1.125C3.69936 1.125 1.125 3.69936 1.125 6.875C1.125 10.0506 3.69936 12.625 6.875 12.625C8.19245 12.625 9.40641 12.1819 10.376 11.4367L12.5947 13.6553C12.8876 13.9482 13.3624 13.9482 13.6553 13.6553C13.9482 13.3624 13.9482 12.8876 13.6553 12.5947L11.4367 10.376Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <UserTable
            data={dataSource}
            setAccoundId={setAccountId}
            setPtMatchingId={setPtMatchingId}
          />
        )}
      </div>
      <div className={`rounded border h-fit border-stone-300`}>
        <UserDetailBox
          accountId={accountId}
          selectMemberData={selectMemberData}
          profileData={profileData}
        />
      </div>
    </div>
  );
}

interface ISelecMemberData extends MemberData {
  key: number;
  process: number;
}

type UserDetailBoxProps = {
  selectMemberData: ISelecMemberData | undefined;
  accountId: number;
  profileData: IOtherProfileData | undefined;
};

const UserDetailBox = ({
  selectMemberData,
  accountId,
  profileData,
}: UserDetailBoxProps) => {
  const [editMemo, setEditMemo] = useState(false);
  const [purposeQuery, setPurposeQuery] = useState<string | undefined>('');
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
    setPurposeQuery(
      profileData?.purposeDtoList
        .map((v) => {
          return v.title + '+$+' + v.content + '+$+' + v.dday;
        })
        .join('+3+'),
    );
  }, [profileData]);
  const onClickEditMemo = () => {
    setEditMemo(!editMemo);
  };

  if (selectMemberData === undefined) {
    return (
      <div className="w-full h-[450px] relative bg-white">
        <Image
          className="object-contain"
          priority
          src={'/images/search-engine-flatline.png'}
          alt="profile"
          fill
        />
      </div>
    );
  }

  if (selectMemberData.status === 'pending') {
    return (
      <div className="w-full h-[450px] relative bg-white">
        <div>Pending</div>
      </div>
    );
  }

  if (selectMemberData.status === 'rejected') {
    return (
      <div className="w-full h-[450px] relative bg-white">
        <div>Rejected</div>
      </div>
    );
  }
  if (selectMemberData.status === 'expired') {
    return (
      <div className="w-full h-[450px] relative bg-white">
        <div>Expired</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[450px] bg-white flex flex-row gap-2 p-7">
      <div className="w-full h-full">
        <div className="flex flex-row space-x-5">
          <div className=" w-16 h-16 bg-slate-200 rounded-full"></div>
          <div>
            {selectMemberData.status === 'active' ? (
              <Link
                href={{
                  pathname: `/${accountId}`,
                  query: {
                    name: selectMemberData.name,
                    phoneNumber: selectMemberData.phoneNumber,
                    traineeId: selectMemberData.accountId,
                    startDate: selectMemberData.startDate,
                    expiredDate: selectMemberData.expiredDate,
                    process: selectMemberData.process,
                    paymentAmount: selectMemberData.paymentAmount,
                    purpose: purposeQuery,
                  },
                }}
              >
                <button className="text-zinc-800 text-xl font-bold hover:underline hover:cursor-pointer">
                  {profileData?.name}
                </button>
              </Link>
            ) : (
              <div className="text-zinc-800 text-xl font-bold hover:underline hover:cursor-pointer">
                {profileData?.name}
              </div>
            )}

            <div>
              <span className="text-indigo-400 text-xs font-medium">
                {selectMemberData
                  ? (new Date(selectMemberData.expiredDate).getTime() -
                      new Date(selectMemberData.startDate).getTime()) /
                    (1000 * 60 * 60 * 24)
                  : 0}
                일 동안 PT 진행중
                <br />
              </span>
              <span className="text-zinc-800 text-xs font-medium">
                PT 기간: {selectMemberData?.startDate} ~{' '}
                {selectMemberData?.expiredDate}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full space-y-4">
        <div className="w-full h-fit p-5 bg-white rounded border border-slate-200">
          <div className="text-zinc-800 text-sm font-bold">목표</div>
          {profileData?.purposeDtoList.length === 0 || profileData === undefined
            ? [1, 2, 3].map((v, i) => {
                return (
                  <div
                    key={v}
                    className={cls(
                      'flex flex-row border border-t-0 border-l-0 border-r-0 justify-between',
                      i === 2 ? 'border-b-0 pt-3' : 'border-b-slate-200 py-3',
                    )}
                  >
                    <div className="flex flex-row gap-2">
                      <div className=" w-8 h-8 relative bg-zinc-300 rounded-full flex justify-center items-center">
                        <Image
                          src="/images/flag-icon.png"
                          alt="pt-goal"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="mt-[1px]">
                        <div className="text-zinc-800 text-xs font-bold">
                          {'목표가 없습니다.'}
                        </div>
                        <div className="text-neutral-500 text-xs font-normal">
                          {'목표가 없습니다.'}
                        </div>
                      </div>
                    </div>
                    <div className="text-indigo-400 font-bold flex justify-center items-center mr-2">
                      D-0
                    </div>
                  </div>
                );
              })
            : profileData?.purposeDtoList.map((purpose, i) => {
                return (
                  <div
                    key={purpose.purposeId}
                    className={cls(
                      'flex flex-row border border-t-0 border-l-0 border-r-0 justify-between',
                      i === 2 ? 'border-b-0 pt-3' : 'border-b-slate-200 py-3',
                    )}
                  >
                    <div className="flex flex-row gap-2">
                      <div className=" w-8 h-8 relative bg-zinc-300 rounded-full flex justify-center items-center">
                        <Image
                          src="/images/flag-icon.png"
                          alt="pt-goal"
                          width={24}
                          height={24}
                        />
                      </div>
                      <div className="mt-[1px]">
                        <div className="text-zinc-800 text-xs font-bold">
                          {purpose.title || '목표가 없습니다.'}
                        </div>
                        <div className="text-neutral-500 text-xs font-normal">
                          {purpose.content || '목표가 없습니다.'}
                        </div>
                      </div>
                    </div>
                    <div className="text-indigo-400 font-bold flex justify-center items-center mr-2">
                      D-{purpose.dday || 0}
                    </div>
                  </div>
                );
              })}
        </div>
        <div className="w-full h-[149px] bg-white rounded border border-slate-200 p-5">
          <div className="flex flex-row w-full justify-between">
            <div className="text-zinc-800 text-sm font-bold mb-3">메모</div>
            <button
              onClick={onClickEditMemo}
              className="text-gray-300 hover:text-gray-500 active:text-gray-900"
            >
              {editMemo ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.27968 13.1019L4.44894 10.2712C4.13352 9.95575 3.63207 9.95575 3.31665 10.2712C3.00122 10.5866 3.00122 11.088 3.31665 11.4035L6.70544 14.7923C7.02087 15.1077 7.5304 15.1077 7.84583 14.7923L16.4189 6.22726C16.7343 5.91184 16.7343 5.41039 16.4189 5.09497C16.1035 4.77954 15.602 4.77954 15.2866 5.09497L7.27968 13.1019Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1741_5607)">
                    <path
                      d="M17.4163 18.9997H1.58301V15.833H17.4163V18.9997ZM10.3388 4.10845L13.3076 7.0772L6.13509 14.2497H3.16634V11.2809L10.3388 4.10845ZM14.1547 6.23012L11.1859 3.26137L12.6347 1.81262C12.9434 1.50387 13.4422 1.50387 13.7509 1.81262L15.6034 3.66512C15.9122 3.97387 15.9122 4.47262 15.6034 4.78137L14.1547 6.23012Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1741_5607">
                      <rect width="19" height="19" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </button>
          </div>
          {editMemo ? (
            <textarea
              className="w-full h-[80%] bg-transparent outline-none"
              placeholder="내용을 입력하세요"
            />
          ) : (
            <div className="w-full h-full bg-transparent outline-none">
              메모내용
            </div>
          )}
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center px-20">
        <div className="w-full h-1/2">
          <UserChart name={selectMemberData?.name || ''} isDownLoad={false} />
        </div>
        <div className="w-full grid grid-cols-2 gap-1">
          {mockInbodyData.map((el) => {
            return (
              <div
                key={el.title}
                className="w-full h-16 bg-white mx-auto rounded border border-stone-300 pl-3 flex flex-col justify-center"
              >
                <div className="text-xs font-normal text-gray-500">
                  {el.title}
                </div>
                <div className=" text-indigo-400 text-xl font-medium">
                  {el.value}
                </div>
                {/* <div className="text-stone-300 text-[8px] font-light">
                  평균 체중 71kg
                </div> */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
