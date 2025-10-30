import type { FC } from "react";

type ErrorMessageProps = {
  message?: string;
};

export const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className='flex items-center justify-center w-full h-full min-h-[200px]'>
      <div className='text-center max-w-md px-6'>
        <div className='text-6xl mb-4 animate-bounce'>💔</div>

        <h3 className='text-xl md:text-2xl font-semibold text-gray-900 mb-2'>
          Oops! Something went wrong
        </h3>

        <p className='text-sm md:text-base text-gray-600'>
          {message || "We couldn't load your data. Please try again later."}
        </p>
      </div>
    </div>
  );
};
