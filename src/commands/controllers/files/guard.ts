import {
  getEntity,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

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

  let entityName = await getEntity(
    vscode,
    'Guard name',
    'E.g. user, role, auth...',
  );

  const guardType = await vscode.window.showQuickPick(
    ['CanActivate', 'CanActivateChild', 'CanDeactivate', 'CanMatch'],
    {
      placeHolder: 'Which type of guard would you like to create?',
    },
  );

  let params = '';

  switch (guardType) {
    case 'CanActivate':
      params = 'route, state';
      break;

    case 'CanActivateChild':
      params = 'childRoute, state';
      break;

    case 'CanDeactivate':
      params = 'component, currentRoute, currentState, nextState';
      break;

    case 'CanMatch':
      params = 'route, segments';
      break;
  }

  const content = `import { ${guardType}Fn } from '@angular/router';

export const ${entityName}Guard: ${guardType}Fn = (${params}) => {
  return true;
};
`;

  const filename = `/${folder}${toKebabCase(entityName)}.guard.ts`;

  save(vscode, fs, path, filename, content);
};

export { newGuard };
