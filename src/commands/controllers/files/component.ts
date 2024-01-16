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

  const component = `import { Component } from '@angular/core';

@Component({
  selector: 'app-{entityName}',
  templateUrl: './{entityName}.component.html',
  styleUrls: ['./{entityName}.component.{style}'],
})
export class {className}Component {}
`;

  let resource;

  if (vscode.workspace.workspaceFolders) {
    resource = vscode.workspace.workspaceFolders[0].uri;
  }

  const angularConfig = vscode.workspace.getConfiguration('angular', resource);
  const content = angularConfig.get('standalone') ? standalone : component;
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

  const body = content
    .replaceAll('{className}', className)
    .replaceAll('{entityName}', toKebabCase(className))
    .replaceAll('{style}', style);

  const filename = `/${folder}${toKebabCase(className)}.component.ts`;

  save(vscode, fs, path, filename, body);
};

export { newComponent };
