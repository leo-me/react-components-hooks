'use client';
import { useState } from 'react';
import Modal from '@/components/Modal';
import './index.scss';



export default function Login() {
  const [open, setOpen] = useState(false);


  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  }

  return (
    <div className='demo-container'>
      <div className='open-btn' onClick={showModal}>open modal</div>
      <Modal
        destroyOnClose
        isOpen={open}
        title="showcase demo"
        onCancel={hideModal}
        onConfirm={hideModal}
        onClose={hideModal}
        position='center'
      >
        <div>load more...</div>
      </Modal>
    </div>);
}