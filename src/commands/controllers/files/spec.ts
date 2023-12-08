import {
  getClass,
  getFolder,
  getType,
  parsePath,
  save,
  toCapitalize,
  toKebabCase,
} from '../../utils/functions';

const content = `import { TestBed } from '@angular/core/testing';

import { {className} } from './{entityName}.{type}';

describe('{className}', () => {
  let {type}: {className};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    {type} = TestBed.inject({className});
  });

  it('should be created', () => {
    expect({type}).toBeTruthy();
  });
});
`;

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

  const body = content
    .replace(/\{className\}/g, className + toCapitalize(type))
    .replace(/\{entityName\}/g, toKebabCase(className))
    .replace(/\{type\}/g, type);

  const filename = '/' + folder + toKebabCase(className) + '.spec.ts';

  save(vscode, fs, path, filename, body);
};

export { newTest };
