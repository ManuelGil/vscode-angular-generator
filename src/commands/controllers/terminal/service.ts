import { execute, getFolder, parsePath } from '../../utils/functions';

const generateService = async (vscode: any, path: any, args: any = null) => {
  let relativePath = '';
  let options;

  if (args) {
    relativePath = parsePath(vscode, path, args);
  }

  let filename = await getFolder(
    vscode,
    'Service name',
    'Service name. E.g. services/auth, services/jwt...',
    relativePath,
  );

  const items = [
    {
      label: '--dry-run',
      description:
        'Run through and reports activity without writing out results.',
    },
    {
      label: '--force',
      description: 'Force overwriting of existing files.',
    },
    {
      label: '--flat',
      description:
        'When true (the default) creates files at the top level of the project.',
    },
    {
      label: '--skip-tests',
      description: 'Do not create "spec.ts" test files for the new service.',
    },
  ];

  options = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select the options for the service generation (optional)',
    canPickMany: true,
  });

  filename = filename.replace('src/app/', '').slice(0, -1);

  const command =
    'ng g s ' +
    filename +
    (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

  execute(vscode, 'generate service', command, true);
};

export { generateService };
