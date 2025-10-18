import { cn } from '@/shared/helpers';

import './CircleStatus.scss';

const STATUS_COLORS = {
  Alive: 'green',
  Dead: 'red',
  Unknown: 'orange'
};

export type TStatusesType = keyof typeof STATUS_COLORS;

export interface ICircleStatusProps {
  status?: TStatusesType;
}

export const CircleStatus = ({ status = 'Alive' }: ICircleStatusProps) => {
  const color = STATUS_COLORS[status];

  return <span className={cn('circleStatus', color)} />;
};
