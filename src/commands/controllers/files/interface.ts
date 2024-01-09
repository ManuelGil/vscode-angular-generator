import {
  getClass,
  getFolder,
  getType,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const content = `export interface {className} {}
`;

const newInterface = async (
  vscode: any,
  fs: any,
  path: any,
  args: any = null,
) => {
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
    'Interface class name',
    'E.g. User, Role, Auth...',
  );

  if (className === 'Interface') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  let type = await getType(
    vscode,
    'Type interface name',
    'E.g. interface, dto, entity, model...',
  );

  className = className.replace(/interface/gi, '');

  const body = content.replace(/\{className\}/g, className);

  type = type.length !== 0 ? '.' + type : '';

  const filename = '/' + folder + toKebabCase(className) + type + '.ts';

  save(vscode, fs, path, filename, body);
};

export { newInterface };
