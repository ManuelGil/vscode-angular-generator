import {
  getClass,
  getFolder,
  getType,
  parsePath,
  save,
  toCapitalize,
  toKebabCase,
} from '../../utils/functions';

const newTest = async (vscode: any, fs: any, path: any, args: any = null) => {
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
    'Test class name',
    'E.g. User, Role, Auth...',
  );

  let type = await getType(
    vscode,
    'Type class name',
    'E.g. class, dto, entity, model...',
  );

  if (type.length === 0) {
    return;
  }

const content = `import { TestBed } from '@angular/core/testing';

import { ${className}${toCapitalize(type)} } from './${toKebabCase(className)}.{type}';

describe('${className}${toCapitalize(type)}', () => {
  let {type}: ${className}${toCapitalize(type)};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    {type} = TestBed.inject(${className}${toCapitalize(type)});
  });

  it('should be created', () => {
    expect(${type}).toBeTruthy();
  });
});
`;

  const filename = `/${folder}${toKebabCase(className)}.spec.ts`;

  save(vscode, fs, path, filename, content);
};

export { newTest };
