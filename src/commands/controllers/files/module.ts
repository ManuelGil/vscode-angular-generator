import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const content = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class {className}Module {}
`;

const newModule = async (vscode: any, fs: any, path: any, args: any = null) => {
  let relativePath = '';

  if (args) {
    relativePath = parsePath(vscode, path, args);
  }

  const folder = await getFolder(
    vscode,
    'Folder name',
    'Folder name. E.g. src, app...',
    relativePath,
  );

  let className = await getClass(
    vscode,
    'Module class name',
    'E.g. User, Role, Auth...',
  );

  if (className === 'Module') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  className = className.replace(/module/gi, '');

  const body = content.replace(/\{className\}/g, className);

  const filename = '/' + folder + toKebabCase(className) + '.module.ts';

  save(vscode, fs, path, filename, body);
};

export { newModule };
