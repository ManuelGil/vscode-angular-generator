import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const content = `export enum {className} {}
`;

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

  let className = await getClass(
    vscode,
    'Enum class name',
    'E.g. User, Role, Auth...',
  );

  if (className === 'Enum') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  className = className.replace(/enum/gi, '');

  const body = content.replace(/\{className\}/g, className);

  const filename = '/' + folder + toKebabCase(className) + '.enum.ts';

  save(vscode, fs, path, filename, body);
};

export { newEnum };
