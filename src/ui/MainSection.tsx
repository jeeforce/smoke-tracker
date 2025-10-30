import type { FC, PropsWithChildren } from "react";

type MainSectionProps = {
  className?: string;
};

export const MainSection: FC<PropsWithChildren<MainSectionProps>> = ({
  children,
  className,
}) => {
  return (
    <div
      className={` bg-gray-400 rounded-3xl p-6 md:p-10 lg:p-12 mx-4 md:mx-6 my-4 ${className}`}
    >
      {children}
    </div>
  );
};
