import React, { useEffect } from 'react';
import { ConfigProvider } from 'antd';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import MetamaskAuth from './components/pages/MetamaskAuth';
import Dashboard from './components/pages/Dashboard';
import { useSDK } from '@metamask/sdk-react-ui';
import PageLoading from './components/pages/PageLoading';
import FileDriveProvider from './contexts/FileDriveProvider';

const Authenticate: React.FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const { connected, account, connecting, ready } = useSDK();

  useEffect(() => {
    if (account) {
      localStorage.setItem('accountId', JSON.stringify(account));
    }
  }, [account]);

  if (ready) {
    if (connecting) {
      return <PageLoading />;
    }

    if (!connected) {
      return <Navigate to="/auth/metamask" />;
    }

    if (!account) {
      return <Navigate to="/auth/metamask" />;
    }

    return children;
  } else {
    return <PageLoading />;
  }
};

const router = createBrowserRouter([
  {
    path: '/auth/metamask',
    element: <MetamaskAuth />,
  },
  {
    path: '/',
    element: (
      <Authenticate>
        <Dashboard />
      </Authenticate>
    ),
  },
  {
    path: '/dashboard',
    element: (
      <Authenticate>
        <Dashboard />
      </Authenticate>
    ),
  },
  {
    path: '/dashboard/:folderId',
    element: (
      <Authenticate>
        <Dashboard />
      </Authenticate>
    ),
  },
]);

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          borderRadius: 10,
        },
      }}
    >
      <FileDriveProvider>
        <RouterProvider router={router}></RouterProvider>
      </FileDriveProvider>
    </ConfigProvider>
  );
};

export default App;
