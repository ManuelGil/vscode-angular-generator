import { execute } from '../../utils/functions';

const analyticsDisable = (vscode: any) => {
  execute(vscode, 'analytics disable', 'ng analytics disable');
};

const analyticsEnable = (vscode: any) => {
  execute(vscode, 'analytics enable', 'ng analytics enable');
};

const analyticsInfo = (vscode: any) => {
  execute(vscode, 'analytics info', 'ng analytics info');
};

const analyticsPrompt = (vscode: any) => {
  execute(vscode, 'analytics prompt', 'ng analytics prompt');
};

export { analyticsDisable, analyticsEnable, analyticsInfo, analyticsPrompt };
