import { execute, getFolder, parsePath } from '../../utils/functions';

const generateComponent = async (vscode: any, path: any, args: any = null) => {
  let relativePath = '';
  let options;

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

  filename = filename.replace('src/', '').replace('app/', '').slice(0, -1);

  const style = vscode.workspace.getConfiguration().get('angular.styles');

  const command =
    'ng generate component ' +
    filename +
    (options ? ' ' + options.map((item: any) => item.label).join(' ') : '') +
    (style ? ' --style=' + style : '');

  execute(vscode, 'generate component', command, true);
};

export { generateComponent };
