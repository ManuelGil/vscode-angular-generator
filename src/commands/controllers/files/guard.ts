import {
  getEntity,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const content = `import { {guardType} } from '@angular/router';

export const {entityName}Guard: {guardType} = ({args}) => {
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

  let entityName = await getEntity(
    vscode,
    'Guard name',
    'E.g. user, role, auth...',
  );

  if (entityName === 'Guard') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  entityName = entityName.replace(/guard/gi, '');

  const guardType = await vscode.window.showQuickPick(
    ['CanActivate', 'CanActivateChild', 'CanDeactivate', 'CanMatch'],
    {
      placeHolder: 'Which type of guard would you like to create?',
    },
  );

  let body = '';

  switch (guardType) {
    case 'CanActivate':
      body = content
        .replace(/\{entityName\}/g, entityName)
        .replace(/\{guardType\}/g, 'CanActivateFn')
        .replace(/\{args\}/g, 'route, state');
      break;

    case 'CanActivateChild':
      body = content
        .replace(/\{entityName\}/g, entityName)
        .replace(/\{guardType\}/g, 'CanActivateChildFn')
        .replace(/\{args\}/g, 'childRoute, state');
      break;

    case 'CanDeactivate':
      body = content
        .replace(/\{entityName\}/g, entityName)
        .replace(/\{guardType\}/g, 'CanDeactivateFn')
        .replace(
          /\{args\}/g,
          'component, currentRoute, currentState, nextState',
        );
      break;

    case 'CanMatch':
      body = content
        .replace(/\{entityName\}/g, entityName)
        .replace(/\{guardType\}/g, 'CanMatchFn')
        .replace(/\{args\}/g, 'route, segments');
      break;

    default:
      break;
  }

  const filename = '/' + folder + toKebabCase(entityName) + '.guard.ts';

  save(vscode, fs, path, filename, body);
};

export { newGuard };
