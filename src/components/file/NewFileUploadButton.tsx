import React, { useContext, useState } from 'react';
import { DocumentPlusIcon, ArrowUpOnSquareIcon } from '@heroicons/react/24/outline';
import { Button, GetProp, Modal, Upload, UploadFile, UploadProps, message } from 'antd';
import useModal from '@/hooks/useModal';
import { fileUpload } from '@/services/fileUpload.ts';
import { File, PinataFile } from '@/lib/interface';
import { useSDK } from '@metamask/sdk-react-ui';
import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';
import { createFile } from '@/services/fileDrive';
import { nanoid } from 'nanoid';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const NewFileUploadButton: React.FC = () => {
  const { isModalOpen, showModal, handleOk, handleCancel } = useModal();
  const [file, setFile] = useState<UploadFile | null>();
  const [uploading, setUploading] = useState(false);
  const { currentFolderId, fileDriveDispatch, getCurrentDirFiles } = useContext(
    FileDriveContext
  ) as FileDriveContextType;
  const { account } = useSDK();

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', file as FileType);
    setUploading(true);

    fileUpload(formData)
      .then((res: PinataFile) => {
        const newFile: File = {
          id: nanoid(14),
          accountId: account,
          fileName: file?.name || 'Untitled',
          IpfsHash: res.IpfsHash,
          folderId: currentFolderId,
          PinSize: res.PinSize,
          TimeStamp: res.Timestamp,
        };
        if (createFile(newFile)) {
          fileDriveDispatch({ type: 'addFiles', payload: { files: getCurrentDirFiles() } });
          setFile(null);
          message.success('upload successfully.');
        } else {
          message.error('File with same name exists');
        }
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
        handleOk();
      });
  };

  const props: UploadProps = {
    onRemove: () => {
      setFile(null);
    },
    beforeUpload: (file) => {
      setFile(file);

      return false;
    },
    maxCount: 1,
  };

  return (
    <>
      <div className="flex items-center gap-2" onClick={showModal}>
        <DocumentPlusIcon width={18} /> New File
      </div>

      <Modal
        title="Upload File"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            type="primary"
            onClick={handleUpload}
            disabled={file == null}
            loading={uploading}
            style={{ marginTop: 16 }}
            key="uploadBtn"
          >
            {uploading ? 'Uploading' : 'Start Upload'}
          </Button>,
        ]}
      >
        <Upload {...props}>
          <Button icon={<ArrowUpOnSquareIcon width={14} />}>Select File</Button>
        </Upload>
      </Modal>
    </>
  );
};

export default NewFileUploadButton;
