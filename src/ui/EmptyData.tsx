import type { FC } from "react";

type EmptyDataProps = {
  title?: string;
  message?: string;
};

export const EmptyData: FC<EmptyDataProps> = ({
  title = "No Data Yet",
  message = "Start tracking your smoking habits to see your statistics and progress here.",
}) => {
  return (
    <div className='flex items-center justify-center w-full h-full min-h-[200px]'>
      <div className='text-center max-w-md px-6'>
        <div className='text-6xl mb-4'>📊</div>

        <h3 className='text-xl md:text-2xl font-semibold text-gray-900 mb-2'>
          {title}
        </h3>

        <p className='text-sm md:text-base text-gray-600'>{message}</p>
      </div>
    </div>
  );
};
