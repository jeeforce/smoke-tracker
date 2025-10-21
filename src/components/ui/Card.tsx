import type { FC, PropsWithChildren } from "react";

type CardProps = {
  className?: string;
};

export const Card: FC<PropsWithChildren<CardProps>> = ({
  children,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg p-6 md:p-8 shadow ${className}`}>
      {children}
    </div>
  );
};
