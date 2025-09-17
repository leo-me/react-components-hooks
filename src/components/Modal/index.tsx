import React, { useCallback } from 'react';
import { createPortal } from 'react-dom';
import cls from 'classnames';
import Mask from '../Mask';
import { cssPrefix } from '../../constants/common';
import {ModalProps} from './types';
import './index.scss';



const Modal: React.FC<ModalProps> = (props) => {
  const {
    className,
    maskClassName,
    cancelText = 'cancel',
    confirmText = 'confirm',
    children,
    footer,
    isOpen = false,
    position = 'center',
    maskClosable = true,
    destroyOnClose = false,
    hasClose = true,
    hasPortal = true, // Whether to use Portal rendering:
    style,
    title,
    onConfirm,
    onCancel,
    onClose,
  } = props;


  // Style isolation / avoiding naming conflicts
  const cssPre = `${cssPrefix}-modal`;

  const clazz = cls(className, cssPre, `${cssPre}_${position}`, {
    [`${cssPre}_open`]: isOpen,
    'has-header': !!title,
    'has-footer': footer !== null,
  });

  const maskClazz = cls({ open: isOpen }, maskClassName);

  const onOverlayClick = useCallback((e) => {
    if (maskClosable) {
      onClose?.(e);
    }
  }, [maskClosable, onClose]);

  const onCancelClick = useCallback((e) => {
    onCancel?.(e);
    onClose?.(e);
  }, [onCancel, onClose]);

  const onConfirmClick = useCallback((e) => {
    onConfirm?.(e);
    onClose?.(e);
  }, [onConfirm, onClose]);


  if (!isOpen && destroyOnClose) {
    return null;
  }

  const renderDefaultFooter = () => (
    <>
      <div className={`${cssPre}-cancel`} onClick={onCancelClick}>{cancelText}</div>
      <div className={`${cssPre}-confirm`} onClick={onConfirmClick}>{confirmText}</div>
    </>
  );

  const renderClose = () => (
    <div className={`${cssPre}-close`} onClick={onClose}>
      <img src={'/close-x.svg'} className={`${cssPre}-close-img`} />
    </div>
  );

  const content = (
    <>
      <Mask className={maskClazz} onClick={onOverlayClick} />

      <div className={clazz} style={style}>
        {title && <div className={`${cssPre}-header`}>{title}</div>}
        {hasClose && renderClose()}

        <div className={`${cssPre}-body`}>
          {children}
        </div>

        <div className={`${cssPre}-footer`}>
          {typeof footer === 'undefined' ? renderDefaultFooter() : footer}
        </div>
      </div>
    </>
  );

  return hasPortal ? createPortal(content, document.body): content;
};

export default Modal;
