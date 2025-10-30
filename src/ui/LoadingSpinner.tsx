import type { FC } from "react";

export const LoadingSpinner: FC = () => {
  return (
    <div className='flex items-center justify-center w-full h-full min-h-[200px]'>
      <div className='relative'>
        <div className='w-16 h-16 rounded-full border-4 border-gray-300'></div>
        <div className='absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-transparent border-t-blue-500 animate-spin'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full animate-pulse'></div>
      </div>
    </div>
  );
};
