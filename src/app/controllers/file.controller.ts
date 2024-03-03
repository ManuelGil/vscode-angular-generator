import { Uri } from 'vscode';

// Import the Config and helper functions
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
   * @constructor
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
   * @function generateClass
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateClass();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateClass(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
        return;
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
  }

  /**
   * Creates a new component.
   *
   * @function generateComponent
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateComponent();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateComponent(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
  }

  /**
   * Creates a new directive.
   *
   * @function generateDirective
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateDirective();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateDirective(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
  }

  /**
   * Creates a new enum.
   *
   * @function generateEnum
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateEnum();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateEnum(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
      },
    );

    if (className === undefined) {
      return;
    }

    const content = `export enum ${className} {}
`;

    const filename = `${dasherize(className)}.enum.ts`;

    saveFile(folder, filename, content);
  }

  /**
   * Creates a new guard.
   *
   * @function generateGuard
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateGuard();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateGuard(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
  }

  /**
   * Creates a new interceptor.
   *
   * @function generateInterceptor
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateInterceptor();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateInterceptor(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
  }

  /**
   * Creates a new interface.
   *
   * @function generateInterface
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateInterface();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateInterface(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
        return;
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
  }

  /**
   * Creates a new module.
   *
   * @function generateModule
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateModule();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateModule(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
  }

  /**
   * Creates a new pipe.
   *
   * @function generatePipe
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generatePipe();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generatePipe(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
  }

  /**
   * Creates a new resolver.
   *
   * @function generateResolver
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateResolver();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateResolver(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
  }

  /**
   * Creates a new service.
   *
   * @function generateService
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateService();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateService(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
  }

  /**
   * Creates a new test.
   *
   * @function generateTest
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateTest();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateTest(path?: Uri): Promise<void> {
    // Get the relative path
    const folderPath: string = path ? await getRelativePath(path.path) : '';

    // Get the path to the folder
    const folder = await getPath(
      'Folder name',
      'Folder name. E.g. src, app...',
      folderPath,
      (path: string) => {
        if (!/^(?!\/)[^\sÀ-ÿ]+?$/.test(path)) {
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
        return;
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
        return;
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
  }
}
