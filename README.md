# Angular File Generator for VSCode

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-angular-generator?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/vscode-angular-generator?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-angular-generator)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/vscode-angular-generator?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-angular-generator/blob/main/LICENSE)

Are you tired of manually creating files for your Angular projects in Visual Studio Code? We have the solution for you! Introducing the **Angular File Generator** extension for VSCode.

![demo](https://raw.githubusercontent.com/ManuelGil/vscode-angular-generator/main/docs/images/demo.gif)

With this powerful extension, you can streamline your Angular development workflow by generating files with just a few clicks. Whether you need a new class, interface, module, or any other Angular component, our extension has you covered.

![preview](https://raw.githubusercontent.com/ManuelGil/vscode-angular-generator/main/docs/images/preview.png)

## Table of Contents

- [Angular File Generator for VSCode](#angular-file-generator-for-vscode)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Project Settings](#project-settings)
  - [Features](#features)
    - [Files](#files)
    - [Commands](#commands)
    - [Snippets](#snippets)
  - [Follow Me](#follow-me)
  - [VSXpert Template](#vsxpert-template)
  - [Other Extensions](#other-extensions)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [License](#license)

## Requirements

- VSCode 1.76.0 or later

## Project Settings

Configure your project by creating or updating a settings.json file at the project's root. If you already have a `.vscode/settings.json` file, skip the first two steps.

1. Open the command palette in VSCode:
   - `CTRL + SHIFT + P` (Windows)
   - `CMD + SHIFT + P` (Mac OS)

2. Type `Preferences: Open Workspace Settings (JSON)`.

3. In the `.vscode/settings.json` file, copy and paste the following settings:

    ```jsonc
    {
      "angular.components.standalone": true,
      "angular.components.style": "css",
      "angular.files.include": [
        "ts"
      ],
      "angular.files.exclude": [
        "**/node_modules/**",
        "**/dist/**",
        "**/out/**",
        "**/build/**",
        "**/.*/**"
      ],
      "angular.files.watch": [
        "modules",
        "components",
        "services"
      ],
      "angular.files.showPath": true,
      "angular.terminal.cwd": "/path/to/your/project/",
      "angular.submenu.customCommands": [
        {
          "name": "Template 1",
          "command": "ng g c",
          "args": "--style css --standalone true --inline-style --inline-template"
        },
        {
          "name": "Template 2",
          "command": "ng g c",
          "args": "--style scss --standalone false --inline-style --inline-template"
        }
      ],
      "angular.submenu.activateItem": {
        "terminal": {
          "component": true,
          "guard": true,
          "pipe": true,
          "service": true
        },
        "file": {
          "class": true,
          "component": true,
          "directive": true,
          "enum": true,
          "guard": true,
          "interceptor": true,
          "interface": true,
          "module": true,
          "pipe": true,
          "resolver": true,
          "service": true,
          "spec": true
        }
      },
      "angular.fileGenerator.skipFolderConfirmation": false,
    }
    ```

4. **Restart VS Code**

Your project is now set up to automatically format code upon saving.

## Features

### Files

| Title  | Purpose |
| --- | --- |
| Angular: Generate Class | Creates a new, generic class definition |
| Angular: Generate Component File | Creates a new, generic component definition |
| Angular: Generate Directive | Creates a new, generic directive definition |
| Angular: Generate Enum | Generates a new, generic enum definition |
| Angular: Generate Guard | Generates a new, generic route guard definition |
| Angular: Generate Interceptor | Creates a new, generic interceptor definition |
| Angular: Generate Interface | Creates a new, generic interface definition |
| Angular: Generate Module | Creates a new, generic NgModule definition |
| Angular: Generate Pipe | Creates a new, generic pipe definition |
| Angular: Generate Resolver | Generates a new, generic resolver definition |
| Angular: Generate Service | Creates a new, generic service definition |
| Angular: Generate Test | Creates a new, generic test definition |

### Commands

| Title  | Purpose |
| --- | --- |
| Angular: Disable Analytics | Disables analytics gathering and reporting for the user |
| Angular: Enable Analytics | Enables analytics gathering and reporting for the user |
| Angular: Info Analytics | Prints analytics gathering and reporting configuration in the console |
| Angular: Prompt Analytics | Prompts the user to set the analytics gathering status interactively |
| Angular: Clean Cache | Deletes persistent disk cache from disk |
| Angular: Disable Cache | Disables persistent disk cache for all projects in the workspace |
| Angular: Enable Cache | Enables disk cache for all projects in the workspace |
| Angular: Info Cache | Prints persistent disk cache configuration and statistics in the console |
| Angular: Generate Component with CLI | Creates a new, generic component definition |
| Angular: Generate Guard with CLI | Creates a new, generic guard definition |
| Angular: Generate Pipe with CLI | Creates a new, generic pipe definition |
| Angular: Generate Service with CLI | Creates a new, service service definition |
| Angular: Generate Environments | Generates and configures environment files for a project |
| Angular: Generate Library | Creates a new, generic library project in the current workspace |
| Angular: Start Server | Builds and serves your application, rebuilding on file changes |
| Angular: Run Tests | Runs unit tests in a project |
| Angular: Run E2E | Builds and serves an Angular application, then runs end-to-end tests |
| Angular: Version | Outputs Angular CLI version |

### Snippets

| Title  | Purpose |
| --- | --- |
| ng_class_module | export class Module {} |
| ng_class_routing_module | export class RoutingModule {} |
| ng_const_routes | export const routes: Routes = [] |
| ng_class_component | export class Component {} |
| ng_class_standalone_component | export class Component {} |
| ng_class_service | export class Service {} |
| ng_unsubscribe | private unsubscribe: Subscription[] = []; |
| ng_subscribe | this.unsubscribe.push(this.subscr); |
| ng_on_destroy | ngOnDestroy {} |
| ng_oninit | ngOnInit {} |
| ng_const_environment | export const environment = {} |
| ng_if | @if (condition) {} |
| ng_if_else | @if (condition) {} @else {} |
| ng_if_else_if | @if (condition) {} @else if (condition) {} |
| ng_else_if | @else if (condition) {} |
| ng_else | @else {} |
| ng_for | @for (condition) {} |
| ng_empty | @empty {} |
| ng_switch | @switch (condition) {} |
| ng_case | @case (condition) {} |
| ng_default | @default {} |
| ng-defer | @defer (condition) {}  |
| ng-placeholder | @placeholder {} |
| ng-loading | @loading {} |
| ng_router_outlet | \<router-outlet>\</router-outlet> |
| ng_router_link | \<a routerLink="">\</a> |

## Follow Me

If you enjoy using this extension, consider following me for updates on this and future projects:

[![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge&logo=github)](https://github.com/ManuelGil)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge&logo=x)](https://twitter.com/imgildev)

## VSXpert Template

This extension was created using [VSXpert](https://vsxpert.com), a template that helps you create Visual Studio Code extensions with ease. VSXpert provides a simple and easy-to-use structure to get you started quickly.

## Other Extensions

- [Angular File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
- [NestJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-generator)
- [T3 Stack / NextJS / ReactJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)
- [Auto Barrel](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
- [CodeIgniter 4 Spark](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)

## Contributing

Angular File Generator for VSCode is open-source software, and we welcome contributions from the community. If you'd like to contribute, please fork the [GitHub repository](https://github.com/ManuelGil/vscode-angular-generator) and submit a pull request with your changes.

Before contributing, please read our [Contribution Guidelines](./CONTRIBUTING.md) for instructions on coding standards, testing, and more.

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or similar personal characteristic. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating in our community.

## Changelog

For a complete list of changes, see the [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - _Owner_ - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-angular-generator/contributors) who participated in this project.

## License

Angular File Generator for VSCode is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details.
