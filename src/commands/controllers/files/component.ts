import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const component = `import { Component } from '@angular/core';

@Component({
  selector: 'app-{entityName}',
  templateUrl: './{entityName}.component.html',
  styleUrls: ['./{entityName}.component.{style}'],
})
export class {className}Component {}
`;

const standalone = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-{entityName}',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './{entityName}.component.html',
  styleUrls: ['./{entityName}.component.{style}'],
})
export class {className}Component {}
`;

const newComponent = async (
  vscode: any,
  fs: any,
  path: any,
  args: any = null,
) => {
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

  let content;

  if (vscode.workspace.getConfiguration().get('angular.standalone')) {
    content = standalone;
  } else {
    content = component;
  }

  const style = vscode.workspace.getConfiguration().get('angular.styles');

  const body = content
    .replace(/\{className\}/g, className)
    .replace(/\{entityName\}/g, toKebabCase(className))
    .replace(/\{style\}/g, style);

  const filename = '/' + folder + toKebabCase(className) + '.component.ts';

  save(vscode, fs, path, filename, body);
};

export { newComponent };
