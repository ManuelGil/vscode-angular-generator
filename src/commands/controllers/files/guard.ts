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

  const content = `import { {guardType} } from '@angular/router';

export const {entityName}Guard: {guardType} = ({args}) => {
  return true;
};
`;

  let body = '';

  switch (guardType) {
    case 'CanActivate':
      body = content
        .replaceAll('{entityName}', entityName)
        .replaceAll('{guardType}', 'CanActivateFn')
        .replaceAll('{args}', 'route, state');
      break;

    case 'CanActivateChild':
      body = content
        .replaceAll('{entityName}', entityName)
        .replaceAll('{guardType}', 'CanActivateChildFn')
        .replaceAll('{args}', 'childRoute, state');
      break;

    case 'CanDeactivate':
      body = content
        .replaceAll('{entityName}', entityName)
        .replaceAll('{guardType}', 'CanDeactivateFn')
        .replaceAll(
          '{args}',
          'component, currentRoute, currentState, nextState',
        );
      break;

    case 'CanMatch':
      body = content
        .replaceAll('{entityName}', entityName)
        .replaceAll('{guardType}', 'CanMatchFn')
        .replaceAll('{args}', 'route, segments');
      break;

    default:
      break;
  }

  const filename = `/${folder}${toKebabCase(entityName)}.guard.ts`;

  save(vscode, fs, path, filename, body);
};

export { newGuard };
