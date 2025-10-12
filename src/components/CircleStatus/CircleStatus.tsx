import { cn } from '@/shared/lib/helper';

import './CircleStatus.scss';

const STATUS_COLORS = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange'
};

export type TStatusesType = keyof typeof STATUS_COLORS;

export interface ICircleStatusProps {
  status: TStatusesType;
}

export const CircleStatus = ({ status }: ICircleStatusProps) => {
  const color = STATUS_COLORS[status];

  return <div className={cn('circleStatus', color)} />;
};
