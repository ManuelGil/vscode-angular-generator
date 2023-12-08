import {
  execute,
  getClass,
  getFolder,
  parsePath,
  toKebabCase,
} from '../../utils/functions';

const generateComponent = async (vscode: any, path: any, args: any = null) => {
  let relativePath = '';
  let skipTests;
  let skipStyles;
  let test = '';
  let style = '';

  if (args) {
    relativePath = parsePath(vscode, path, args);
  }

  let filename = await getFolder(
    vscode,
    'Component name',
    'Component name. E.g. src/app/modules/users, modules/users, modules/projects...',
    relativePath,
  );

  skipTests = await vscode.window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Skip tests?',
  });

  if (skipTests === 'Yes') {
    test = ' --skip-tests';
  }

  skipStyles = await vscode.window.showQuickPick(['Yes', 'No'], {
    placeHolder: 'Skip styles?',
  });

  if (skipStyles === 'Yes') {
    style = ' --style=none';
  }

  filename = filename.replace('src/', '/').replace('app/', '/');

  execute(
    vscode,
    'generate component',
    'ng generate component ' +
      filename +
      test +
      style,
    false,
  );
};

export { generateComponent };
