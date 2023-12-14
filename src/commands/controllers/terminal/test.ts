import { execute } from '../../utils/functions';

const test = (vscode: any) => {
  execute(vscode, 'test', 'ng t');
};

export { test };
