import {
  getClass,
  getFolder,
  getType,
  parsePath,
  save,
  toCapitalize,
  toKebabCase,
} from '../../utils/functions';

const content = `export class {className} {}
`;

const newClass = async (vscode: any, fs: any, path: any, args: any = null) => {
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
    'Class name',
    'E.g. User, Role, Auth...',
  );

  let type = await getType(
    vscode,
    'Type class name',
    'E.g. class, dto, entity, model...',
  );

  const body = content.replace(
    /\{className\}/g,
    className + toCapitalize(type),
  );

  type = type.length !== 0 ? '.' + type : '';

  const filename = '/' + folder + toKebabCase(className) + type + '.ts';

  save(vscode, fs, path, filename, body);
};

export { newClass };
