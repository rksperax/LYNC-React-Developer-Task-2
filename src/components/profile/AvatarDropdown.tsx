import React from 'react';
import { MenuProps, Dropdown, Avatar } from 'antd';

const items: MenuProps['items'] = [
  {
    key: '1',
    label: 'Account',
  },
];

const AvatarDropdown: React.FC = () => {
  return (
    <Dropdown menu={{ items }} placement="bottomLeft">
      <Avatar
        style={{ backgroundColor: '', verticalAlign: 'middle' }}
        size="large"
        className="hover:cursor-pointer bg-orange-400"
      >
        P
      </Avatar>
    </Dropdown>
  );
};

export default AvatarDropdown;
