import React from 'react';
import { Modal } from 'antd';
import { FolderPlusIcon } from '@heroicons/react/24/outline';
import useModal from '@/hooks/useModal';

import { nanoid } from 'nanoid';
import { Folder } from '@/lib/interface';
import { useSDK } from '@metamask/sdk-react-ui';
import { useParams } from 'react-router-dom';
import FolderForm from './FolderForm';
import { rootFolderId } from '@/lib/constants';

const NewFolderButton: React.FC = () => {
  const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
  const { folderId } = useParams();
  const { account } = useSDK();

  const folder: Folder = {
    id: nanoid(10),
    accountId: account,
    folderName: 'Untitled',
    parentFolderID: folderId || rootFolderId,
    createdAt: new Date(),
  };

  return (
    <>
      <div className="flex items-center gap-2" onClick={showModal}>
        <FolderPlusIcon width={18} /> New Folder
      </div>
      <Modal title="Create Folder" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[]}>
        <FolderForm folder={folder} onSubmitCallback={handleCancel} />
      </Modal>
    </>
  );
};

export default NewFolderButton;
