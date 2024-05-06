import React from 'react';
import Spinner from '../ui/Spinner';
import { Typography } from 'antd';

const { Text } = Typography;

const PageLoading: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-3">
      <Spinner /> <Text type="secondary">please wait...</Text>
    </div>
  );
};

export default PageLoading;
