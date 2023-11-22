import Link from 'next/link';

const LeftNavigationbar = () => {
  return (
    <div className="w-[18vw] h-full bg-zinc-800 fixed left-0 py-8 px-4 z-10">
      <div className="text-white text-3xl font-bold text-center mb-20">
        Pocket PT
      </div>
      <div className="space-y-1">
        <Link href="/">
          <div className="w-full h-12 flex flex-row items-center hover:cursor-pointer gap-4">
            <div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="text-base text-white font-bold">회원 관리</div>
          </div>
        </Link>
        <div className="w-full h-12 flex flex-row items-center hover:cursor-pointer gap-4 opacity-40">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12.3701 8.87988H17.6201"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.37988 8.87988L7.12988 9.62988L9.37988 7.37988"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.3701 15.8799H17.6201"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6.37988 15.8799L7.12988 16.6299L9.37988 14.3799"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-base text-white font-bold">
            주간 프로그램 관리
          </div>
        </div>
        <div className="w-full h-12 flex flex-row items-center hover:cursor-pointer gap-4  opacity-40">
          <div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.0399 3.01976L8.15988 10.8998C7.85988 11.1998 7.55988 11.7898 7.49988 12.2198L7.06988 15.2298C6.90988 16.3198 7.67988 17.0798 8.76988 16.9298L11.7799 16.4998C12.1999 16.4398 12.7899 16.1398 13.0999 15.8398L20.9799 7.95976C22.3399 6.59976 22.9799 5.01976 20.9799 3.01976C18.9799 1.01976 17.3999 1.65976 16.0399 3.01976Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.9102 4.1499C15.5802 6.5399 17.4502 8.4099 19.8502 9.0899"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="text-base text-white font-bold">운동 일지 관리</div>
        </div>
        <div className="w-full h-12 flex flex-row items-center hover:cursor-pointer gap-4  opacity-40">
          <div>
            <svg
              width="29"
              height="29"
              viewBox="0 0 29 29"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.5561 4.22802L21.7441 2.41602L19.9321 4.22802L18.1201 2.41602L16.3081 4.22802L14.4961 2.41602L12.6841 4.22802L10.872 2.41602L9.06004 4.22802L7.24804 2.41602V19.3281H3.62402V22.9521C3.62402 24.9574 5.24275 26.5761 7.24804 26.5761H21.7441C23.7494 26.5761 25.3681 24.9574 25.3681 22.9521V2.41602L23.5561 4.22802ZM18.1201 24.1601H7.24804C6.58363 24.1601 6.04003 23.6165 6.04003 22.9521V21.7441H18.1201V24.1601ZM22.9521 22.9521C22.9521 23.6165 22.4085 24.1601 21.7441 24.1601C21.0797 24.1601 20.5361 23.6165 20.5361 22.9521V19.3281H9.66404V6.04003H22.9521V22.9521Z"
                fill="white"
              />
              <path
                d="M10.8721 8.45605H18.1201V10.8721H10.8721V8.45605Z"
                fill="white"
              />
              <path
                d="M19.3281 8.45605H21.7441V10.8721H19.3281V8.45605Z"
                fill="white"
              />
              <path
                d="M10.8721 12.0801H18.1201V14.4961H10.8721V12.0801Z"
                fill="white"
              />
              <path
                d="M19.3281 12.0801H21.7441V14.4961H19.3281V12.0801Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="text-base text-white font-bold">매출</div>
        </div>
      </div>
    </div>
  );
};

export default LeftNavigationbar;
