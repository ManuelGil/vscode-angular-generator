import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const content = `import { CanActivateFn } from '@angular/router';

export const {{entityName}}Guard: CanActivateFn = (route, state) => {
  return true;
};
`;

const newGuard = async (vscode: any, fs: any, path: any, args: any = null) => {
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

  let entityName = await getClass(
    vscode,
    'Guard name',
    'E.g. user, role, auth...',
  );

  if (entityName === 'Guard') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  entityName = entityName.replace(/guard/gi, '');

  const body = content.replace(/\{entityName\}/g, entityName);

  const filename = '/' + folder + toKebabCase(entityName) + '.guard.ts';

  save(vscode, fs, path, filename, body);
};

export { newGuard };
