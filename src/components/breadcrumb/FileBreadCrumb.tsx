import { FileDriveContext, FileDriveContextType } from '@/contexts/FileDriveProvider';
import { Breadcrumb } from 'antd';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const FileBreadCrumb: React.FC = () => {
  const { getFolderHierarchy, currentFolderId, setCurrentFolder } = useContext(
    FileDriveContext
  ) as FileDriveContextType;

  function handleNavigation(folderId: string) {
    setCurrentFolder(folderId);
  }

  const items = getFolderHierarchy(currentFolderId, []).map((hierarchy) => ({
    title: (
      <Link
        to={`/dashboard/${hierarchy.folderId}`}
        onClick={() => {
          handleNavigation(hierarchy.folderId);
        }}
      >
        {hierarchy.label}
      </Link>
    ),
  }));

  return (
    <div>
      <Breadcrumb items={items} className="m-4" />
    </div>
  );
};

export default FileBreadCrumb;
