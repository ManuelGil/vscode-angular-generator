import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const content = `import { Component } from '@angular/core';

@Component({
  selector: 'app-{entityName}',
  templateUrl: './{entityName}.component.html',
  styleUrls: ['./{entityName}.component.css'],
})
export class {className}Component {}
`;

const newComponent = async (vscode: any, fs: any, path: any, args: any = null) => {
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
    'Component class name',
    'E.g. User, Role, Auth...',
  );

  if (className === 'Component') {
    vscode.window.showErrorMessage('The file has not been created!');
    return;
  }

  className = className.replace(/component/gi, '');

  const body = content.replace(/\{className\}/g, className);

  const filename = '/' + folder + toKebabCase(className) + '.component.ts';

  save(vscode, fs, path, filename, body);
};

export { newComponent };
