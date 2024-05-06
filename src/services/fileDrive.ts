import { getFiles, getFolders } from '@/lib/constants';
import { File, FileDrive, Folder } from '@/lib/interface';

export function setFiles(acconut: string, fileDrive: FileDrive) {
  localStorage.setItem(acconut, JSON.stringify(fileDrive));
}

export function createFolder(folder: Folder): Folder[] {
  const updatedFolders: Folder[] = [...getFolders(), folder];
  localStorage.setItem('folders', JSON.stringify([...updatedFolders]));
  return getFolderByAccount(folder.accountId || '');
}

export function createFile(file: File): boolean {
  const fileInDb: File | undefined = getFiles().find(
    (extFile) =>
      extFile.fileName === file.fileName && extFile.accountId === file.accountId && extFile.folderId === file.folderId
  );
  if (fileInDb === undefined) {
    const newFiles: File[] = [...getFiles(), file];
    localStorage.setItem('files', JSON.stringify(newFiles));
    return true;
  }

  return false;
}

export function getFolderByAccount(accountId: string) {
  return getFolders().filter((folder: Folder) => folder.accountId === accountId);
}

export function getFilesByAccount(accountId: string) {
  return getFiles().filter((file: File) => file.accountId === accountId);
}

export function renameFolder(folderId: string, newName: string) {
  const folders: Folder[] = getFolders();
  const index: number | undefined = folders.findIndex((folder) => folder.id === folderId);

  if (index > -1) {
    folders[index]['folderName'] = newName;
    localStorage.setItem('folders', JSON.stringify(folders));
  }

  return folders;
}

export function deleteFolder(folderId: string) {
  const folders: Folder[] = getFolders();
  const index: number | undefined = folders.findIndex((folder) => folder.id === folderId);

  if (index > -1) {
    folders.splice(index, 1);
    localStorage.setItem('folders', JSON.stringify(folders));
  }
  return folders;
}

export function renameFile(fileId: string, newName: string) {
  const files: File[] = getFiles();
  const index: number | undefined = files.findIndex((file) => file.id === fileId);

  if (index > -1) {
    files[index]['fileName'] = newName;
    localStorage.setItem('files', JSON.stringify(files));
  }

  return files;
}

export function deleteFile(fileId: string) {
  const files: File[] = getFiles();
  const index: number | undefined = files.findIndex((file) => file.id === fileId);

  if (index > -1) {
    files.splice(index, 1);
    localStorage.setItem('files', JSON.stringify(files));
  }
  return files;
}
