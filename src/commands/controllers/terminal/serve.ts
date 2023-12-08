import { execute } from '../../utils/functions';

const start = (vscode: any) => {
  execute(vscode, 'start', 'ng serve');
};

export { start };
