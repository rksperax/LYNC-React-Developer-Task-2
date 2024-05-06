import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Spinner: React.FC = () => {
  return <Spin indicator={<LoadingOutlined style={{ fontSize: 16 }} spin />} />;
};

export default Spinner;
