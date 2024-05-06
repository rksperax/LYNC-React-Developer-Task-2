import React, { useContext, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Typography } from 'antd';
import { Layout } from 'antd';
import { genFileTree, genFileTreeMenu } from '@/lib/file';
import { rootFolderId } from '@/lib/constants';
import { useSDK } from '@metamask/sdk-react-ui';
const { Sider } = Layout;

import { FolderTree } from '@/lib/interface';
import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';
import { MenuItem } from '@/lib/types';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const Sidebar: React.FC = () => {
  const { fileDrive, setCurrentFolder } = useContext(FileDriveContext) as FileDriveContextType;
  const { account = '' } = useSDK();
  const [items, setItems] = useState<MenuItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFileTree();
  }, [fileDrive]);

  function changeFolderPath(folderId: string) {
    navigate(`/dashboard/${folderId}`);
    setCurrentFolder(folderId);
  }

  function loadFileTree() {
    const folderTree: FolderTree = genFileTree(rootFolderId, account);
    const items: MenuItem = genFileTreeMenu(folderTree, changeFolderPath);

    setItems([items]);
  }

  return (
    <Sider style={{ height: '100%' }}>
      <Title level={5} className="!text-white p-4">
        File Drive
      </Title>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
    </Sider>
  );
};

export default Sidebar;
