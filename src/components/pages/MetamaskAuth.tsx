import { MetaMaskButton, useSDK } from '@metamask/sdk-react-ui';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageLoading from './PageLoading';
import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';

const MetamaskAuth: React.FC = () => {
  const { connected, account, connecting } = useSDK();
  const { currentFolderId } = useContext(FileDriveContext) as FileDriveContextType;
  const navigate = useNavigate();

  useEffect(() => {
    if (connected && account) {
      navigate(`/dashboard/${currentFolderId}`);
    }
  }, [account, connected]);

  if (connecting) {
    return <PageLoading />;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="text-center">
        <h2 className="text-xl font-bold text-center mb-3">
          Please Connect Your MetaMask Wallet To Continue to Dashboard
        </h2>
        <p className="text-center">Open your MetaMask Extensions</p>
        <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
      </div>
    </div>
  );
};

export default MetamaskAuth;
