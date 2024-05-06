import { Flex } from 'antd';
import React from 'react';
import AvatarDropdown from '../profile/AvatarDropdown';
import MetamarkUIButton from '../metmask/MetamarkUIButton';
import CreateNewButton from '../file/CreateNewButton';

const Navbar: React.FC = () => {
  return (
    <Flex
      className="h-full mx-4"
      align="center"
      justify="space-between"
      gap={2}
    >
      <CreateNewButton />
      <div className="flex items-center gap-1">
        <MetamarkUIButton />
        <AvatarDropdown />
      </div>
    </Flex>
  );
};

export default Navbar;
