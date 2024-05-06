import React, { useContext } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Folder } from '@/lib/interface';
import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';
import { renameFolder } from '@/services/fileDrive';

type Props = {
  folder: Folder;
  onSubmitCallback: () => void;
  edit?: boolean;
};

const FolderFormModal: React.FC<Props> = ({ folder, onSubmitCallback, edit = false }) => {
  const { fileDriveDispatch, getCurrentFolderDir } = useContext(FileDriveContext) as FileDriveContextType;
  const [form] = Form.useForm();

  function handleOnSubmit(values: { folderName: string }) {
    if (edit) {
      renameFolder(folder.id, values.folderName);
      fileDriveDispatch({ type: 'updateFolders', payload: { folders: getCurrentFolderDir() } });
    } else {
      fileDriveDispatch({ type: 'createFolder', payload: { folder: { ...folder, ...values } } });
    }
    onSubmitCallback();
    form.resetFields();
    message.success(`Folder ${edit ? 'updated' : 'created'} successfully`);
  }

  return (
    <Form
      form={form}
      name="wrap"
      labelCol={{ flex: '110px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      style={{ maxWidth: 600 }}
      initialValues={{ ...folder }}
      onFinish={handleOnSubmit}
    >
      <Form.Item name="folderName" rules={[{ required: true }]}>
        <Input placeholder="Folder Name" autoFocus value={folder.folderName} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {edit ? 'Update' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FolderFormModal;
