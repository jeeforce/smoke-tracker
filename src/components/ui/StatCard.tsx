import type { FC } from "react";
import { Card } from "./Card";

type StatCardProps = {
  value: number | string;
  label: string;
};

export const StatCard: FC<StatCardProps> = ({
  value,
  label,
}: StatCardProps) => {
  return (
    <Card>
      <div className='text-4xl md:text-5xl font-bold text-gray-900 mb-1'>
        {value}
      </div>
      <div className='text-sm md:text-base text-gray-700'>{label}</div>
    </Card>
  );
};
