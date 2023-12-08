import { execute } from '../../utils/functions';

const generateEnvironments = (vscode: any) => {
  execute(vscode, 'generate environments', 'ng generate environments');
};

export { generateEnvironments };
