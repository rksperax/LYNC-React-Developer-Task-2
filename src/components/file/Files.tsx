import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';
import {
  FileExtentions,
  fileIcon,
  getFileExtention,
  getFileIcon,
  getTrimmedFileName,
  imageExtentions,
} from '@/lib/file';
import { type File } from '@/lib/interface';
import { deleteFile } from '@/services/fileDrive';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { Row, Col, Dropdown, MenuProps, message, Popconfirm, PopconfirmProps } from 'antd';
import React, { useContext } from 'react';

const Files = () => {
  const { fileDrive } = useContext(FileDriveContext) as FileDriveContextType;
  const { files } = fileDrive;

  return (
    <>
      <Row gutter={[30, 20]}>
        {files.map((file: File, index) => {
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
              <File file={file} />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

const File: React.FC<{ file: File }> = ({ file }) => {
  const { setFile } = useContext(FileDriveContext) as FileDriveContextType;
  const url: string = `https://${import.meta.env.VITE_GATEWAY_URL}/ipfs/${file.IpfsHash}`;
  const fileIcon: string = getFileIcon(file.fileName);

  const items: MenuProps['items'] = [
    {
      key: 'rename',
      label: 'Rename',
      onClick: () => {
        setFile(file);
      },
    },
    {
      key: 'delete',
      label: <DeleteFileButton fileId={file.id} />,
      danger: true,
    },
  ];

  return (
    <div className="p-4 bg-gray-200 rounded-2xl hover:cursor-pointer hover:bg-gray-300 w-[18rem]">
      <div className="flex items-center  justify-between mb-3">
        <div className="flex items-center gap-1">
          <img src={fileIcon} alt="" width={24} />
          <h6 className="text-sm text-gray-700 text-ellipsis overflow-hidden mt-0.5">
            {getTrimmedFileName(file.fileName)}
          </h6>
        </div>
        <Dropdown menu={{ items }} trigger={['click']}>
          <EllipsisVerticalIcon width={25} className="hover:cursor-pointer hover:bg-gray-200 rounded-lg ml-2 p-1" />
        </Dropdown>
      </div>

      <div className="flex justify-center items-center file-thumbnail">
        <FilePreview fileName={file.fileName} url={url} />
      </div>
    </div>
  );
};

export const FilePreview: React.FC<{ fileName: string; url: string }> = ({ fileName, url }) => {
  const fileExtention: FileExtentions = getFileExtention(fileName);

  if (imageExtentions.includes(fileExtention)) {
    return (
      <img
        src={url}
        alt="ipfs image"
        className="file-thumbnail rounded-2xl"
        onClick={() => window.open(url, '_blank')}
      />
    );
  }

  switch (fileExtention) {
    case '.pdf':
      return <img src={fileIcon['.pdf']} width={50} />;
    default:
      return <img src={fileIcon['default']} width={50} />;
  }
};

export const DeleteFileButton: React.FC<{ fileId: string }> = ({ fileId }) => {
  const { fileDriveDispatch, getCurrentDirFiles } = useContext(FileDriveContext) as FileDriveContextType;

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    e?.preventDefault();
    deleteFile(fileId);
    fileDriveDispatch({ type: 'addFiles', payload: { files: getCurrentDirFiles() } });
    message.success('File Deleted');
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

export default Files;
