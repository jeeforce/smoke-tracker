import type { FC, PropsWithChildren } from "react";

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className='bg-gray-400 rounded-3xl p-6 md:p-10 lg:p-12 min-h-full flex flex-col'>
      {children}
    </div>
  );
};
