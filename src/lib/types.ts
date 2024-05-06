import { MenuProps } from 'antd';

export type FolderHierarchy = { folderId: string; label: string };
export type MenuItem = Required<MenuProps>['items'][number];
