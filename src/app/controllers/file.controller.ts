import { statSync } from 'fs';
import { resolve } from 'path';
import { Uri, l10n, window, workspace } from 'vscode';

// Import the Config and helper functions
import { Config } from '../configs';
import {
  dasherize,
  getName,
  getPath,
  pickItem,
  pickItemWithIcons,
  resolvePlaceholders,
  saveFile,
  showError,
  showMessage,
  titleize,
  validateClassName,
  validateEntityName,
  validateFolderName,
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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    // Get the type
    let type = await getName(
      l10n.t('Enter the type name'),
      l10n.t('E.g. class, dto, entity, model...'),
      validateEntityName,
    );

    if (!type) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the component class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    const omitSuffix = this.config.omitSuffix;
    let content;

    if (this.config.standalone) {
      content = `import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-${dasherize(className)}',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './${dasherize(className)}${omitSuffix ? '' : '.component'}.html',
  styleUrls: ['./${dasherize(className)}${omitSuffix ? '' : '.component'}.${this.config.style}'],
})
export class ${className}${omitSuffix ? '' : 'Component'} {}
`;
    } else {
      content = `import { Component } from '@angular/core';

@Component({
  selector: 'app-${dasherize(className)}',
  templateUrl: './${dasherize(className)}${omitSuffix ? '' : '.component'}.html',
  styleUrls: ['./${dasherize(className)}${omitSuffix ? '' : '.component'}.${this.config.style}'],
})
export class ${className}${omitSuffix ? '' : 'Component'} {}
`;
    }

    const filename = `${dasherize(className)}${omitSuffix ? '' : '.component'}.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the directive class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    const omitSuffix = this.config.omitSuffix;

    const content = `import { Directive } from '@angular/core';

@Directive({
  selector: '[app${className}]',
})
export class ${className}${omitSuffix ? '' : 'Directive'} {}
`;

    const filename = `${dasherize(className)}${omitSuffix ? '' : '.directive'}.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the enum class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    const content = `export enum ${className} {}
`;

    const omitSuffix = this.config.omitSuffix;
    const filename = `${dasherize(className)}${omitSuffix ? '' : '.enum'}.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const entityName = await getName(
      l10n.t('Enter the guard name'),
      l10n.t('E.g. user, role, auth...'),
      (name: string) => {
        if (!/^[a-z][\w-]+$/.test(name)) {
          return l10n.t(
            'Invalid format! Entity names MUST be declared in camelCase and have at least 1 character (e.g. user, authService).',
          );
        }
        return;
      },
    );

    if (!entityName) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    const guardType = await pickItem(
      ['CanActivate', 'CanActivateChild', 'CanDeactivate', 'CanMatch'],
      l10n.t('Which type of guard would you like to create?'),
    );

    let params = '';

    switch (guardType) {
      case 'CanActivate':
        params = l10n.t('route, state');
        break;

      case 'CanActivateChild':
        params = l10n.t('childRoute, state');
        break;

      case 'CanDeactivate':
        params = l10n.t('component, currentRoute, currentState, nextState');
        break;

      case 'CanMatch':
        params = l10n.t('route, segments');
        break;
    }

    const content = `import { ${guardType}Fn } from '@angular/router';

export const ${entityName}Guard: ${guardType}Fn = (${params}) => {
  return true;
};
`;

    const filename = `${dasherize(entityName)}${this.config.typeSeparator}guard.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the interceptor class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
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

    const filename = `${dasherize(className)}${this.config.typeSeparator}interceptor.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the interface class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    // Get the type
    let type = await getName(
      l10n.t('Enter the interface type name'),
      l10n.t('E.g. interface, dto, entity, model...'),
      validateEntityName,
    );

    if (!type) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the module class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
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

    const filename = `${dasherize(className)}${this.config.typeSeparator}module.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the pipe class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
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

    const filename = `${dasherize(className)}${this.config.typeSeparator}pipe.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the resolver class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
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

    const filename = `${dasherize(className)}${this.config.typeSeparator}resolver.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the service class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    const omitSuffix = this.config.omitSuffix;

    const content = `import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ${className}${omitSuffix ? '' : 'Service'} {}
`;

    const filename = `${dasherize(className)}${omitSuffix ? '' : '.service'}.ts`;

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
    // Check if the path is a file
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    const skipFolderConfirmation = this.config.skipFolderConfirmation;
    let folder: string | undefined;

    if (!folderPath || !skipFolderConfirmation) {
      // Get the path to the folder
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showError(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    // Get the class name
    const className = await getName(
      l10n.t('Enter the test class name'),
      l10n.t('E.g. User, Role, Auth...'),
      validateClassName,
    );

    if (!className) {
      return;
    }

    // Get the type using enhanced selector with icons
    const typeOptions = [
      {
        label: 'Class',
        value: 'class',
        icon: '$(symbol-class)',
        description: 'Simple class for domain objects',
      },
      {
        label: 'Interface',
        value: 'interface',
        icon: '$(symbol-interface)',
        description: 'Define object shapes and contracts',
      },
      {
        label: 'DTO',
        value: 'dto',
        icon: '$(symbol-structure)',
        description: 'Data Transfer Objects',
      },
      {
        label: 'Model',
        value: 'model',
        icon: '$(database)',
        description: 'Data models for business logic',
      },
      {
        label: 'Entity',
        value: 'entity',
        icon: '$(references)',
        description: 'Database entities',
      },
      {
        label: 'Enum',
        value: 'enum',
        icon: '$(symbol-enum)',
        description: 'Type-safe enumeration',
      },
    ];

    let type = await pickItemWithIcons(
      typeOptions,
      l10n.t('Select the test type'),
    );

    if (!type) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    const content = `import { TestBed } from '@angular/core/testing';

import { ${className}${titleize(type)} } from './${dasherize(className)}${this.config.typeSeparator}${type}';

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

  /**
   * Creates a new custom element.
   *
   * @function generateCustomElement
   * @param {Uri} [path] - The path to the folder
   * @public
   * @async
   * @memberof FileController
   * @example
   * generateCustomElement();
   *
   * @returns {Promise<void>} - The result of the operation
   */
  async generateCustomElement(path?: Uri): Promise<void> {
    // Determine target folder
    if (path && statSync(path.fsPath).isFile()) {
      path = Uri.file(resolve(path.fsPath, '..'));
    }

    // Get the relative path
    const folderPath: string = path ? workspace.asRelativePath(path.path) : '';

    let folder: string | undefined;

    if (!folderPath || !this.config.skipFolderConfirmation) {
      folder = await getPath(
        l10n.t('Enter the folder name'),
        l10n.t('Folder name. E.g. src, app...'),
        folderPath,
        validateFolderName,
      );

      if (!folder) {
        const message = l10n.t('Operation cancelled by user');
        showMessage(message);
        return;
      }
    } else {
      folder = folderPath;
    }

    if (this.config.templates.length === 0) {
      const message = l10n.t(
        'The custom components list is empty. Please add custom components to the configuration',
      );
      showError(message);
      return;
    }

    const items = this.config.templates.map((item: any) => ({
      label: item.name,
      description: item.description,
      detail: item.type,
      template: item.template,
    }));

    const option = await window.showQuickPick(items, {
      placeHolder: l10n.t(
        'Select the template for the custom element generation',
      ),
    });

    if (!option) {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    const template = this.config.templates.find(
      (item: any) => item.name === option.label,
    )!;

    let content = Object(template).template.join('\n');

    // Resolve placeholders in template content
    try {
      content = await resolvePlaceholders(content, this.config.style);
    } catch {
      const message = l10n.t('Operation cancelled by user');
      showMessage(message);
      return;
    }

    // Generate filename
    const ext = Object(template).type ? `.${Object(template).type}` : '';

    // Extraer el nombre de la clase de forma segura
    const classNameMatch = content.match(/class\s+(\w+)/);
    if (!classNameMatch) {
      const message = l10n.t('Could not extract class name from template');
      showError(message);
      return;
    }

    const filename = `${dasherize(classNameMatch[1])}${ext}.ts`;

    // Save file
    saveFile(folder!, filename, content);
  }
}
