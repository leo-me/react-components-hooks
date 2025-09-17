import { CSSProperties, ReactNode } from 'react';

export interface ModalProps {
  /**
   * Additional CSS class for the root element
   */
  className?: string;
  /**
   * Additional CSS class for the mask element
   */
  maskClassName?: string;
  /**
   * Modal position; when set to `bottom`, the footer will not be displayed
   * @default "center"
   */
  position?: 'center' | 'bottom';
  /**
   * Inline style for the modal container
   */
  style?: CSSProperties;
  /**
   * Whether the modal is visible
   * @default false
   */
  isOpen: boolean;
  /**
   * Title content of the modal
   */
  title?: ReactNode;
  /**
   * Body content of the modal
   */
  children?: ReactNode;
  /**
   * Footer content of the modal.  
   * Set `footer={null}` to hide the footer
   */
  footer?: ReactNode;
  /**
   * Whether clicking on the mask should close the modal
   * @default false
   */
  maskClosable?: boolean;
  /**
   * Whether to unmount modal children when the modal is closed
   * @default false
   */
  destroyOnClose?: boolean;
  /**
   * Whether to show the close (×) icon
   * @default true
   */
  hasClose?: boolean;
  /**
   * Whether to render the modal via a React portal
   * @default true
   */
  hasPortal?: boolean;
  /**
   * Text for the Cancel button
   * @default "Cancel"
   */
  cancelText?: string;
  /**
   * Text for the Confirm button
   * @default "Confirm"
   */
  confirmText?: string;
  /**
   * Callback when the modal is closed
   */
  onClose?: (event: any) => void;
  /**
   * Callback when the Cancel button is clicked
   */
  onCancel?: (event: any) => void;
  /**
   * Callback when the Confirm button is clicked
   */
  onConfirm?: (event: any) => void;
}
