import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const newEnum = async (vscode: any, fs: any, path: any, args: any = null) => {
  let relativePath = '';

  if (args) {
    relativePath = parsePath(vscode, path, args);
  }

  const folder = await getFolder(
    vscode,
    'Folder name',
    'Folder name. E.g. src, app...',
    relativePath,
  );

  const className = await getClass(
    vscode,
    'Enum class name',
    'E.g. User, Role, Auth...',
  );

  const content = `export enum ${className} {}
`;

  const filename = `/${folder}${toKebabCase(className)}.enum.ts`;

  save(vscode, fs, path, filename, content);
};

export { newEnum };
