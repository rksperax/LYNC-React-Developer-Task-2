import pdfIconPng from '@/assets/images/pdf.png';
import jpgIconPng from '@/assets/images/jpg.png';
import unknownIconPng from '@/assets/images/unknown.png';
import { File, Folder, FolderTree } from './interface';
import { getFilesByAccount, getFolderByAccount } from '@/services/fileDrive';
import { getFolders } from './constants';
import { MenuItem } from './types';

const re: RegExp = /(?:\.([^.]+))?$/;
export const getFileExtention = (fileName: string): FileExtentions =>
  (re.exec(fileName)?.[0] as FileExtentions) || 'default';

export enum FileExtentions {
  PNG = '.png',
  JPG = '.jpg',
  PDF = '.pdf',
  JPEG = '.jpeg',
  DEFAULT = 'default',
}
export const supportedFileExtention: string[] = Object.values(FileExtentions);
export const imageExtentions: string[] = [FileExtentions.JPEG, FileExtentions.JPG, FileExtentions.PNG];
export const fileIcon: { [key in FileExtentions]: string } = {
  '.pdf': pdfIconPng,
  '.png': jpgIconPng,
  '.jpeg': jpgIconPng,
  '.jpg': jpgIconPng,
  default: unknownIconPng,
};

export const getFileIcon = (fileName: string): string => {
  const fileExtention: FileExtentions = getFileExtention(fileName);
  if (supportedFileExtention.includes(fileExtention)) {
    return fileIcon[fileExtention];
  }

  return fileIcon['default'];
};

export const getTrimmedFileName = (fileName: string): string => {
  const maxSize: number = 10;
  if (fileName.length > maxSize) {
    const fileExtention: FileExtentions = getFileExtention(fileName);
    return `${fileName.slice(0, maxSize)}...${fileExtention}`;
  }

  return fileName;
};

export const genFileTree = (folderId: string, accountId: string): FolderTree => {
  const folders: Folder[] = getFolderByAccount(accountId).filter((folder) => folder.parentFolderID === folderId);
  const folder: Folder | undefined = getFolders().find((folder) => folder.id === folderId);
  const files: File[] = getFilesByAccount(accountId).filter((file) => file.folderId === folderId);

  const folderTree: FolderTree = {
    folderId,
    name: folder?.folderName || 'My Drive',
    files,
    folderTree: folders.map((folder) => genFileTree(folder.id, accountId)),
  };

  return folderTree;
};

export const genFileTreeMenu = (fileTree: FolderTree, setCurrentFolder: (folderId: string) => void): MenuItem => {
  const items: MenuItem = {
    key: fileTree.folderId,
    label: fileTree.name,
    children: [
      ...fileTree.files.map(
        (file): MenuItem => ({
          key: file.id,
          label: file.fileName,
          onClick: () => {
            setCurrentFolder(fileTree.folderId);
          },
        })
      ),
      ...fileTree.folderTree.map((folderTree): MenuItem => genFileTreeMenu(folderTree, setCurrentFolder)),
    ],
  };

  return items;
};
