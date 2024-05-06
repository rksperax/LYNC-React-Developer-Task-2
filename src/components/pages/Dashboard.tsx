import Sidebar from '@components/sidebar/Sidebar';
import Navbar from '@components/navbar/Navbar';
import { Empty, Layout, theme } from 'antd';
import Folders from '@components/file/Folders';
import FileBreadCrumb from '../breadcrumb/FileBreadCrumb';
import Files from '@components/file/Files';
import { useContext } from 'react';
import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';

const { Header, Content } = Layout;

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { fileDrive } = useContext(FileDriveContext) as FileDriveContextType;

  const isFilDriveEmpty = fileDrive.files.length === 0 && fileDrive.folders.length === 0;

  return (
    <Layout style={{ height: '100%' }}>
      <Sidebar />
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Navbar />
        </Header>
        <FileBreadCrumb />
        <Content className="mx-4 bg-white p-4" style={{ borderRadius: borderRadiusLG }}>
          {isFilDriveEmpty ? (
            <Empty />
          ) : (
            <>
              <Folders />
              <br />
              <Files />
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
