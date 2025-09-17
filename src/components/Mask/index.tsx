import React, { MouseEventHandler } from 'react';
import cls from 'classnames';
import { cssPrefix } from '../../constants/common';
import './index.scss';

type Props = {
  className?: string;
  onClick: (event: React.MouseEvent) => void;
}

const Mask: React.FC<Props> = (props) => {
  const { className, onClick }  = props;
  const clazz = cls(`${cssPrefix}-mask`, className);

  return (
    <div
      className={clazz}
      onClick={onClick}
    />
  );
};

export default Mask;
