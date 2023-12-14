import { execute, getFolder, parsePath } from '../../utils/functions';

const generateComponent = async (vscode: any, path: any, args: any = null) => {
  let resource;

  if (vscode.workspace.workspaceFolders) {
    resource = vscode.workspace.workspaceFolders[0].uri;
  }

  const angularConfig = vscode.workspace.getConfiguration('angular', resource);

  let relativePath = '';
  let options;
  let isStandalone = false;

  if (args) {
    relativePath = parsePath(vscode, path, args);
  }

  let filename = await getFolder(
    vscode,
    'Component name',
    'Component name. E.g. src/app/modules/users, modules/users, modules/projects...',
    relativePath,
  );

  const standalone = vscode.workspace
    .getConfiguration()
    .get('angular.standalone');

  const items = [
    {
      label: '--dry-run',
      description:
        'Run through and reports activity without writing out results.',
    },
    {
      label: '--skip-import',
      description: 'Do not import this component into the owning NgModule.',
    },
    {
      label: '--skip-selector',
      description: 'Specifies if the component should have a selector or not.',
    },
    {
      label: '--skip-tests',
      description: 'Do not create "spec.ts" test files for the new component.',
    },
    {
      label: '--standalone',
      description: 'Whether the generated component is standalone.',
      picked: standalone,
    },
  ];

  options = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select the options for the component generation (optional)',
    canPickMany: true,
  });

  isStandalone = !!options.find((item: any) => item.label === '--standalone');
  options = options.filter((item: any) => item.label !== '--standalone');

  filename = filename.replace('src/', '').replace('app/', '').slice(0, -1);

  const style = angularConfig.get('style');

  const command =
    'ng g c ' +
    filename +
    (style ? ' --style ' + style : '') +
    (isStandalone ? ' --standalone true' : ' --standalone false') +
    (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

    execute(vscode, 'generate component', command, true);
};

export { generateComponent };
