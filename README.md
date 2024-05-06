# File Drive

Manage Your File in IPFs ( Inter Planetory FileSystem ) like Google Drive in web 3 technology

# Instructions to Run Project

install all packages

```
npm install
```

set development variables

```
VITE_INFURA_API_KEY=""
VITE_PINATA_JWT=""
VITE_GATEWAY_URL=""
```

Where to get the secrets?

create infura api key [link](https://docs.infura.io/dashboard/create-api)

setup pinata variables [link to docs](https://docs.pinata.cloud/quickstart/react#create-an-api-key-and-get-gateway-url)

### Run Project

```
npm run dev
```

# Features 💡

1. Manage Folders, with nested tress
2. Manage Files any type
3. Rename Folders and Files
4. Delete Folders and Files
5. access files and folders from sidebar
6. MetaMask web3 authentication
7. Preview Images and Icons of file type
8. Storing Files in IPFs protocol Tool
9. Use Breadcrumbs for

# Code Snippets

### Generating File tree using recursive method

```ts
export const generateFileTree = (folderId: string, accountId: string): FolderTree => {
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
```

### get folder hierarchy by forder id

Example: `my drive/ Docs/ Identitites`
How to get the hierarchy of the folder using the selected folder id using recursive method.

```ts
function getFolderHierarchy(folderId: string, folderHierarchy: FolderHierarchy[] = []): FolderHierarchy[] {
  if (folderId === rootFolderId) {
    return [{ folderId: rootFolderId, label: 'My Drive' }, ...folderHierarchy];
  }

  const folder: Folder | undefined = getFolders().find((folder) => folder.id === folderId);
  if (folder?.parentFolderID) {
    folderHierarchy = [{ folderId: folder.id, label: folder.folderName }, ...folderHierarchy];
  }

  return getFolderHierarchy(folder?.parentFolderID || rootFolderId, folderHierarchy);
}
```

### File Storage Data Structure

```ts
export interface Folder {
  id: string;
  accountId: string;
  parentFolderID: string; // root folders will by default have 'my-drive'
  folderName: string;
  createdAt: Date;
  files?: File[];
}

export interface File {
  id: string;
  folderId: string;
  IpfsHash: string;
  fileName: string;
  TimeStamp: Date;
  PinSize: number;
  accountId: string | undefined;
}
```
