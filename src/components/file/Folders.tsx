import { type Folder } from '@/lib/interface';
import { Button, Col, Dropdown, MenuProps, Popconfirm, PopconfirmProps, Row, message } from 'antd';
import React, { useContext } from 'react';
import { FolderIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';
import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';
import { deleteFolder } from '@/services/fileDrive';

const Folders: React.FC = () => {
  const { fileDrive } = useContext(FileDriveContext) as FileDriveContextType;
  const { folders } = fileDrive;

  return (
    <>
      <Row gutter={[30, 20]}>
        {folders.map((folder: Folder, index) => {
          const key = `col-${index}`;
          return (
            <Col
              key={key}
              xs={{ flex: '100%' }}
              sm={{ flex: '50%' }}
              md={{ flex: '40%' }}
              lg={{ flex: '20%' }}
              xl={{ flex: '10%' }}
            >
              <Folder folder={folder} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

const Folder: React.FC<{ folder: Folder }> = ({ folder }) => {
  const navigate = useNavigate();
  const { setCurrentFolder, setFolder } = useContext(FileDriveContext) as FileDriveContextType;

  function handleFolderDoubleClick() {
    navigate(`/dashboard/${folder.id}`);
    setCurrentFolder(folder.id);
  }

  const items: MenuProps['items'] = [
    {
      key: 'rename',
      label: 'Rename',
      onClick: () => {
        setFolder(folder);
      },
    },
    {
      key: 'delete',
      label: <DeleteFolderButton folderId={folder.id} />,
      danger: true,
    },
  ];

  return (
    <Button
      type="text"
      icon={<FolderIcon width={16} />}
      size="large"
      className="flex items-center hover:bg-blue-300 hover:cursor-default bg-gray-200 focus:bg-blue-300 active:bg-blue-300"
      onDoubleClick={handleFolderDoubleClick}
    >
      {folder.folderName}
      <Dropdown menu={{ items }} trigger={['click']}>
        <EllipsisVerticalIcon width={25} className="hover:cursor-pointer hover:bg-gray-200 rounded-lg ml-2 p-1" />
      </Dropdown>
    </Button>
  );
};

export const DeleteFolderButton: React.FC<{ folderId: string }> = ({ folderId }) => {
  const { fileDriveDispatch, getCurrentFolderDir } = useContext(FileDriveContext) as FileDriveContextType;

  const confirm: PopconfirmProps['onConfirm'] = () => {
    deleteFolder(folderId);
    fileDriveDispatch({ type: 'updateFolders', payload: { folders: getCurrentFolderDir() } });
    message.success('Folder Deleted');
  };

  return (
    <Popconfirm
      title="Are you sure?"
      description="Are you sure to delete this folder?"
      onConfirm={confirm}
      okText="Yes"
      cancelText="No"
    >
      Delete
    </Popconfirm>
  );
};

export default Folders;
