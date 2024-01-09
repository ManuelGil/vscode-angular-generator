import { execute, getFolder } from '../../utils/functions';

const generateLibrary = async (vscode: any) => {
  let resource;

  if (vscode.workspace.workspaceFolders) {
    resource = vscode.workspace.workspaceFolders[0].uri;
  }

  const angularConfig = vscode.workspace.getConfiguration('angular', resource);

  let options;
  let isStandalone = false;

  let filename = await getFolder(vscode, 'Libray name', '', '');

  const standalone = angularConfig.get('standalone');

  const items = [
    {
      label: '--dry-run',
      description:
        'Run through and reports activity without writing out results.',
    },
    {
      label: '--force',
      description: 'Forces overwriting of files.',
    },
    {
      label: '--skip-install',
      description: 'Do not install dependency packages.',
    },
    {
      label: '--skip-package-json',
      description: 'Do not add dependencies to the "package.json" file.',
    },
    {
      label: '--skip-ts-config',
      description:
        'Do not update "tsconfig.json" to add a path mapping for the new library. The path mapping is needed to use the library in an app, but can be disabled here to simplify development.',
    },
    {
      label: '--standalone',
      description:
        'Creates a library based upon the standalone API, without NgModules.',
      picked: standalone,
    },
  ];

  options = await vscode.window.showQuickPick(items, {
    placeHolder: 'Select the options for the library generation (optional)',
    canPickMany: true,
  });

  isStandalone = !!options.find((item: any) => item.label === '--standalone');
  options = options.filter((item: any) => item.label !== '--standalone');

  const command =
    'ng g lib ' +
    filename.slice(0, -1) +
    (isStandalone ? ' --standalone true' : ' --standalone false') +
    (options ? ' ' + options.map((item: any) => item.label).join(' ') : '');

  execute(vscode, 'generate library', command, true);
};

export { generateLibrary };
