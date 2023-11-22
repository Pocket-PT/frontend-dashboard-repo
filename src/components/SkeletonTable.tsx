'use client';

const SkeletonTable = () => {
  return (
    <div
      role="status"
      className="w-full rounded shadow animate-pulse space-y-1"
    >
      <div className="w-full h-12 bg-gray-200" />
      <div className="w-full h-12 bg-gray-300" />
      <div className="w-full h-12 bg-gray-200" />
      <div className="w-full h-12 bg-gray-300" />
      <div className="w-full h-12 bg-gray-200" />
    </div>
  );
};

export default SkeletonTable;
