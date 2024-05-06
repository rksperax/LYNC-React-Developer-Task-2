export interface FileDrive {
  name: string;
  folders: Folder[];
  files: File[];
  currentFolderId: string;
}

export interface File {
  id: string;
  IpfsHash: string;
  fileName: string;
  TimeStamp: Date;
  PinSize: number;
  accountId: string | undefined;
  folderId: string;
}

export interface Folder {
  id: string;
  accountId?: string;
  folderName: string;
  parentFolderID: string;
  createdAt: Date;
  files?: File[];
}

export interface PinataFile {
  id: string;
  IpfsHash: string;
  PinSize: number;
  Timestamp: Date;
  isDuplicate: boolean;
}

export interface FolderTree {
  folderId: string;
  name: string;
  files: File[];
  folderTree: FolderTree[];
}
