import { cn } from '@/shared/helpers';

import { STATUS_COLORS } from '@/shared/constants';
import type { TStatus } from '@/shared/types';

import './CircleStatus.scss';

export interface ICircleStatusProps {
  status?: TStatus;
}

export const CircleStatus = ({ status = 'alive' }: ICircleStatusProps) => {
  const color = STATUS_COLORS[status];

  return <span className={cn('circleStatus', color)} />;
};
