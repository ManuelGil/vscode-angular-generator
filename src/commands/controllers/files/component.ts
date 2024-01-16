import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const newComponent = async (
  vscode: any,
  fs: any,
  path: any,
  args: any = null,
) => {
  let resource;

  if (vscode.workspace.workspaceFolders) {
    resource = vscode.workspace.workspaceFolders[0].uri;
  }

  const angularConfig = vscode.workspace.getConfiguration('angular', resource);
  const style = angularConfig.get('style');

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

  const className = await getClass(
    vscode,
    'Component class name',
    'E.g. User, Role, Auth...',
  );

  let content;

  if (angularConfig.get('standalone')) {
    content = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-${toKebabCase(className)}',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './${toKebabCase(className)}.component.html',
  styleUrls: ['./${toKebabCase(className)}.component.${style}'],
})
export class ${className}Component {}
`;
  } else {
    content = `import { Component } from '@angular/core';

@Component({
  selector: 'app-${toKebabCase(className)}',
  templateUrl: './${toKebabCase(className)}.component.html',
  styleUrls: ['./${toKebabCase(className)}.component.${style}'],
})
export class ${className}Component {}
`;
  }

  const filename = `/${folder}${toKebabCase(className)}.component.ts`;

  save(vscode, fs, path, filename, content);
};

export { newComponent };
