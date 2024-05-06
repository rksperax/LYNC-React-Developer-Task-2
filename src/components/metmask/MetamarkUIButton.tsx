import React from 'react';
import { MetaMaskButton, useSDK } from '@metamask/sdk-react-ui';
import Spinner from '../ui/Spinner';

const MetamarkUIButton: React.FC = () => {
  const { connected, connecting, account } = useSDK();

  if (connecting) {
    return <Spinner />;
  }

  if (connected && account) {
    return <div>{account && `${account}`}</div>;
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <MetaMaskButton theme={'light'} color="white"></MetaMaskButton>
    </div>
  );
};

export default MetamarkUIButton;
