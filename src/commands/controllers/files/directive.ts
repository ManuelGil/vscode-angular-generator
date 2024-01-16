import {
  getClass,
  getFolder,
  parsePath,
  save,
  toKebabCase,
} from '../../utils/functions';

const newDirective = async (
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
    'Directive class name',
    'E.g. User, Role, Auth...',
  );

  const content = `import { Directive } from '@angular/core';

@Directive({
  selector: '[app${className}]',
})
export class ${className}Directive {}
`;

  const filename = `/${folder}${toKebabCase(className)}.interceptor.ts`;

  save(vscode, fs, path, filename, content);
};

export { newDirective };
