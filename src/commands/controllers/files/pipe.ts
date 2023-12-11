import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const content = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '{entityName}',
})
export class {className}Pipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
`;

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

  const body = content
    .replace(/\{className\}/g, className)
    .replace(/\{entityName\}/g, toKebabCase(className));

  const filename = '/' + folder + toKebabCase(className) + '.pipe.ts';

  save(vscode, fs, path, filename, body);
};

export { newPipe };
