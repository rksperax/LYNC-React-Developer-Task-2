import React, { useContext, useEffect } from 'react';
import { Form, Input, Button, message } from 'antd';
import { File } from '@/lib/interface';
import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';
import { renameFile } from '@/services/fileDrive';

type Props = {
  file: File;
  onSubmitCallback: () => void;
  edit?: boolean;
};

const EditFileForm: React.FC<Props> = ({ file, onSubmitCallback, edit = true }) => {
  const { fileDriveDispatch, getCurrentDirFiles } = useContext(FileDriveContext) as FileDriveContextType;
  const [form] = Form.useForm();

  function handleOnSubmit(values: { fileName: string }) {
    renameFile(file.id, values.fileName);
    fileDriveDispatch({ type: 'addFiles', payload: { files: getCurrentDirFiles() } });
    form.resetFields();
    message.success(`Folder ${edit ? 'updated' : 'created'} successfully`);
    onSubmitCallback();
  }

  useEffect(() => {
    form.resetFields();
    return form.resetFields();
  }, [form]);

  return (
    <Form
      form={form}
      name="wrap"
      labelCol={{ flex: '110px' }}
      labelAlign="left"
      labelWrap
      wrapperCol={{ flex: 1 }}
      colon={false}
      style={{ maxWidth: 600 }}
      initialValues={{ ...file }}
      onFinish={handleOnSubmit}
    >
      <Form.Item name="fileName" rules={[{ required: true }]}>
        <Input placeholder="Folder Name" autoFocus />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {edit ? 'Update' : 'Create'}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditFileForm;
