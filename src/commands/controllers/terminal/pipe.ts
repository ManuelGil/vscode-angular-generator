import { execute, getFolder, parsePath } from '../../utils/functions';

const generatePipe = async (vscode: any, path: any, args: any = null) => {
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
    'Pipe name',
    'Pipe name. E.g. modules/transform-letters, modules/searh-user, modules/search-projects...',
    relativePath,
  );

  const standalone = angularConfig.get('standalone');

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
      label: '--skip-import',
      description: 'Do not import this pipe into the owning NgModule.',
    },
    {
      label: '--skip-tests',
      description: 'Do not create "spec.ts" test files for the new pipe.',
    },
    {
      label: '--standalone',
      description: 'Whether the generated pipe is standalone.',
      picked: standalone,
    },
  ];

  options = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select the options for the pipe generation (optional)',
    canPickMany: true,
  });

  isStandalone = !!options.find((item: any) => item.label === '--standalone');
  options = options.filter((item: any) => item.label !== '--standalone');

  filename = filename.replace('src/app/', '').slice(0, -1);

  const command =
    'ng g p ' +
    filename +
    (isStandalone ? ' --standalone true' : ' --standalone false') +
    (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

  execute(vscode, 'generate pipe', command, true);
};

export { generatePipe };
