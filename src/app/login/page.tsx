"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/Modal';
import List from "@/components/List";
import { Button } from '@/components/Button/index';
import './index.scss';



export default function Login() {
  const router = useRouter();
  const [open, setOpen] = useState(false);


  const showModal = () => {
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const goMall = () => {
    router?.push('/');
  };  

  return (
    <div className='demo-container'>
      <div className='open-btn' onClick={showModal}>open modal</div>
      <Button onClick={goMall}>home</Button>   
      {/* <div className='open-btn' onClick={goMall}>go mall</div> */}
      <div className='list-container'>
        <List />
      </div>
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