const MyHeader = () => {
  return (
    <header className="w-full z-10 h-16 bg-white border border-stone-300 fixed pl-[18vw] flex flex-row items-center justify-between py-3 pr-10">
      <div className="flex flex-row space-x-4 ml-10 items-center">
        <div className="text-zinc-800 text-xl font-bold">김일곤</div>
        <div>
          <span className="text-neutral-500 text-base font-medium">
            관심있음
          </span>
          <span className="text-indigo-400 text-base font-medium">13</span>
        </div>
      </div>
      <div className="h-full flex flex-row gap-1">
        <div className="w-40 flex items-center justify-center h-full bg-white border border-stone-300 text-center">
          <div className="text-stone-500 text-lg font-bold">
            연장/업그레이드
          </div>
        </div>
        <div className="w-40 flex items-center justify-center h-full bg-white border border-stone-300 text-center">
          <div className="text-stone-500 text-lg font-bold">나가기</div>
        </div>
      </div>
    </header>
  );
};

export default MyHeader;
