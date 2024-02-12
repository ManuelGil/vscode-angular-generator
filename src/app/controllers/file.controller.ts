import { Uri } from 'vscode';

import { Config } from '../configs';
import {
  dasherize,
  getName,
  getPath,
  getRelativePath,
  pickItem,
  saveFile,
  titleize,
} from '../helpers';

// Import the Config and helper functions

/**
 * The FileController class.
 *
 * @class
 * @classdesc The class that represents the example controller.
 * @export
 * @public
 * @property {Config} config - The configuration
 * @example
 * const controller = new FileController(config);
 */
export class FileController {
  // -----------------------------------------------------------------
  // Constructor
  // -----------------------------------------------------------------

  /**
   * Constructor for the FileController class.
   *
   * @param {Config} config - The configuration
   * @public
   * @memberof FileController
   */
  constructor(private readonly config: Config) {}

  // -----------------------------------------------------------------
  // Methods
  // -----------------------------------------------------------------

  // Public methods
  /**
   * Creates a new class.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createClass();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newClass = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    // Get the type
    let type = await getName(
      'Type class name',
      'E.g. class, dto, entity, model...',
      (type: string) => {
        if (!/[a-z]+/.test(type)) {
          return 'Invalid format!';
        }
      },
    );

    if (type === undefined) {
      return;
    }

    const content = `export class ${className}${titleize(type)} {}
`;

    type = type.length !== 0 ? `.${type}` : '';

    const filename = `${dasherize(className)}${type}.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new component.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createComponent();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newComponent = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Component class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    let content;

    if (this.config.standalone) {
      content = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-${dasherize(className)}',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './${dasherize(className)}.component.html',
  styleUrls: ['./${dasherize(className)}.component.${this.config.style}'],
})
export class ${className}Component {}
`;
    } else {
      content = `import { Component } from '@angular/core';

@Component({
  selector: 'app-${dasherize(className)}',
  templateUrl: './${dasherize(className)}.component.html',
  styleUrls: ['./${dasherize(className)}.component.${this.config.style}'],
})
export class ${className}Component {}
`;
    }

    const filename = `${dasherize(className)}.component.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new directive.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createDirective();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newDirective = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Directive class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    const content = `import { Directive } from '@angular/core';

@Directive({
  selector: '[app${className}]',
})
export class ${className}Directive {}
`;

    const filename = `${dasherize(className)}.interceptor.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new enum.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createEnum();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newEnum = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Enum class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    const content = `export enum ${className} {}
`;

    const filename = `${dasherize(className)}.enum.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new guard.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createGuard();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newGuard = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const entityName = await getName(
      'Guard name',
      'E.g. user, role, auth...',
      (name: string) => {
        if (!/^[a-z][\w-]+$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (entityName === undefined) {
      return;
    }

    const guardType = await pickItem(
      ['CanActivate', 'CanActivateChild', 'CanDeactivate', 'CanMatch'],
      'Which type of guard would you like to create?',
    );

    let params = '';

    switch (guardType) {
      case 'CanActivate':
        params = 'route, state';
        break;

      case 'CanActivateChild':
        params = 'childRoute, state';
        break;

      case 'CanDeactivate':
        params = 'component, currentRoute, currentState, nextState';
        break;

      case 'CanMatch':
        params = 'route, segments';
        break;
    }

    const content = `import { ${guardType}Fn } from '@angular/router';

export const ${entityName}Guard: ${guardType}Fn = (${params}) => {
  return true;
};
`;

    const filename = `${dasherize(entityName)}.guard.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new interceptor.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createInterceptor();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newInterceptor = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Interceptor class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    const content = `import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ${className}Interceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}
`;

    const filename = `${dasherize(className)}.interceptor.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new interface.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createInterface();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newInterface = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Interceptor class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    // Get the type
    let type = await getName(
      'Type interface name',
      'E.g. interface, dto, entity, model...',
      (type: string) => {
        if (!/[a-z]+/.test(type)) {
          return 'Invalid format!';
        }
      },
    );

    if (type === undefined) {
      return;
    }

    const content = `export interface ${className}${titleize(type)} {}
`;

    type = type.length !== 0 ? `.${type}` : '';

    const filename = `${dasherize(className)}${type}.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new module.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createModule();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newModule = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Module class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    const content = `import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class ${className}Module {}
`;

    const filename = `${dasherize(className)}.module.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new pipe.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createPipe();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newPipe = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Pipe class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    const content = `import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: '${dasherize(className)}',
})
export class ${className}Pipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }
}
`;

    const filename = `${dasherize(className)}.pipe.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new resolver.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createResolver();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newResolver = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Pipe class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    const content = `import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ${className}Resolver implements Resolve<boolean> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return of(true);
  }
}
`;

    const filename = `${dasherize(className)}.resolver.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new service.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createService();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newService = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Service class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    const content = `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ${className}Service {}
`;

    const filename = `${dasherize(className)}.service.ts`;

    saveFile(folder, filename, content);
  };

  /**
   * Creates a new test.
   *
   * @param {Uri} path - The path to the folder
   * @example
   * createTest();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  newTest = async (path?: Uri) => {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^[A-Za-z][\w\s\/-]+$/.test(path)) {
          return 'The folder name must be a valid name';
        }
        return;
      },
    );

    if (folder === undefined) {
      return;
    }

    // Get the class name
    const className = await getName(
      'Test class name',
      'E.g. User, Role, Auth...',
      (name: string) => {
        if (!/^[A-Z][A-Za-z]{2,}$/.test(name)) {
          return 'Invalid format! Entity names MUST be declared in camelCase.';
        }
      },
    );

    if (className === undefined) {
      return;
    }

    // Get the type
    let type = await getName(
      'Type class name',
      'E.g. class, dto, entity, model...',
      (type: string) => {
        if (!/[a-z]+/.test(type)) {
          return 'Invalid format!';
        }
      },
    );

    if (type === undefined) {
      return;
    }

    const content = `import { TestBed } from '@angular/core/testing';

import { ${className}${titleize(type)} } from './${dasherize(className)}.${type}';

describe('${className}${titleize(type)}', () => {
  let ${type}: ${className}${titleize(type)};

  beforeEach(() => {
    TestBed.configureTestingModule({});
    ${type} = TestBed.inject(${className}${titleize(type)});
  });

  it('should be created', () => {
    expect(${type}).toBeTruthy();
  });
});
`;

    const filename = `${dasherize(className)}.spec.ts`;

    saveFile(folder, filename, content);
  };
}
