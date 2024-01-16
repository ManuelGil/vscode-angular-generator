import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const newPipe = async (vscode: any, fs: any, path: any, args: any = null) => {
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
    'Pipe class name',
    'E.g. User, Role, Auth...',
  );

  const content = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '${toKebabCase(className)}',
})
export class ${className}Pipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
`;

  const filename = `/${folder}${toKebabCase(className)}.pipe.ts`;

  save(vscode, fs, path, filename, content);
};

export { newPipe };
