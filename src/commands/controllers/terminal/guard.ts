import { execute, getFolder, parsePath } from '../../utils/functions';

const generateGuard = async (vscode: any, path: any, args: any = null) => {
  let relativePath = '';
  let options;

  if (args) {
    relativePath = parsePath(vscode, path, args);
  }

  let filename = await getFolder(
    vscode,
    'Guard name',
    'Guard name. E.g. guards/auth, guards/jwt...',
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
      label: '--skip-tests',
      description: 'Do not create "spec.ts" test files for the new guard.',
    },
  ];

  options = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select the options for the guard generation (optional)',
    canPickMany: true,
  });

  filename = filename.replace('src/app/', '').slice(0, -1);

  const command =
    'ng g g ' +
    filename +
    (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

  execute(vscode, 'generate guard', command, true);
};

export { generateGuard };
