import { execute } from '../../utils/functions';

const e2e = (vscode: any) => {
  execute(vscode, 'e2e', 'ng e');
};

export { e2e };
