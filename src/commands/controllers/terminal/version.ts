import { execute } from '../../utils/functions';

const version = (vscode: any) => {
  execute(vscode, 'version', 'ng v');
};

export { version };
