import { useState } from 'react';

function useModal(defaultState?: boolean) {
  const [isModalOpen, setIsModalOpen] = useState(defaultState || false);

  const showModal = (e?: React.MouseEvent<HTMLElement>) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, showModal, handleOk, handleCancel };
}

export default useModal;
