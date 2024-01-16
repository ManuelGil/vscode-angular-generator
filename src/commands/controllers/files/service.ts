import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const newService = async (
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

  const className = await getClass(
    vscode,
    'Service class name',
    'E.g. User, Role, Auth...',
  );

  const content = `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ${className}Service {}
`;

  const filename = `/${folder}${toKebabCase(className)}.service.ts`;

  save(vscode, fs, path, filename, content);
};

export { newService };
