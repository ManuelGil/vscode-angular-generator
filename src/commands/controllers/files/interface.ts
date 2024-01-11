import {
  getClass,
  getFolder,
  getType,
  parsePath,
  save,
  toCapitalize,
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

  const className = await getClass(
    vscode,
    'Interface class name',
    'E.g. User, Role, Auth...',
  );

  let type = await getType(
    vscode,
    'Type interface name',
    'E.g. interface, dto, entity, model...',
  );

  const body = content.replace(
    /\{className\}/g,
    className + toCapitalize(type),
  );

  type = type.length !== 0 ? '.' + type : '';

  const filename = '/' + folder + toKebabCase(className) + type + '.ts';

  save(vscode, fs, path, filename, body);
};

export { newInterface };
