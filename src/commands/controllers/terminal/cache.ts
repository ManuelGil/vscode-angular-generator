import { execute } from '../../utils/functions';

const cacheClear = (vscode: any) => {
  execute(vscode, 'cache clean', 'ng cache clean');
};

const cacheDisable = (vscode: any) => {
  execute(vscode, 'cache disable', 'ng cache disable');
};

const cacheEnable = (vscode: any) => {
  execute(vscode, 'cache enable', 'ng cache enable');
};

const cacheInfo = (vscode: any) => {
  execute(vscode, 'cache info', 'ng cache info');
};

export { cacheClear, cacheDisable, cacheEnable, cacheInfo };
