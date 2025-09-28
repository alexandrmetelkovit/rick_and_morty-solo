import classNames from 'classnames';

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

export const CircleStatus = ({ status = 'Unknown' }: ICircleStatusProps) => {
  const color = STATUS_COLORS[status];

  return color ? <div className={classNames('circle-status', color)} /> : null;
};
