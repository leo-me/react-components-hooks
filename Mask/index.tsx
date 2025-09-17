import React from 'react';
import cls from 'classnames';
import { cssPrefix } from '../common';
import './index.less';

type Props = {
  className?: string;
  onClick: (event) => void;
}

const Mask: React.FC<Props> = (props) => {
  const { className, onClick }  = props;
  const clazz = cls(`${cssPrefix}-mask`, className);

  return (
    <div
      className={clazz}
      onClick={onClick}
      catchMove
    ></div>
  );
};

export default Mask;
