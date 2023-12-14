import { execute } from '../../utils/functions';

const start = (vscode: any) => {
  execute(vscode, 'start', 'ng s');
};

export { start };
