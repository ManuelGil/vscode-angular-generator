# Angular File Generator for VSCode

[![Latest Release](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-angular-generator?style=flat&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/vscode-angular-generator)]()

Are you tired of manually creating files for your Angular projects in Visual Studio Code? We have the solution for you! Introducing the **Angular File Generator** extension for VSCode.

![demo](https://raw.githubusercontent.com/ManuelGil/vscode-angular-generator/main/docs/images/demo.gif)

With this powerful extension, you can streamline your Angular development workflow by generating files with just a few clicks. Whether you need a new class, interface, module, or any other Angular component, our extension has you covered.

![menu](https://raw.githubusercontent.com/ManuelGil/vscode-angular-generator/main/docs/images/menu.png)

![commands](https://raw.githubusercontent.com/ManuelGil/vscode-angular-generator/main/docs/images/commands.png)

![config](https://raw.githubusercontent.com/ManuelGil/vscode-angular-generator/main/docs/images/config.png)

## Table of Contents

- [Angular File Generator for VSCode](#angular-file-generator-for-vscode)
  - [Table of Contents](#table-of-contents)
  - [Requirements](#requirements)
  - [Project Settings](#project-settings)
  - [Features](#features)
    - [Files](#files)
    - [Commands](#commands)
    - [Snippets](#snippets)
  - [Other Repositories](#other-repositories)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [License](#license)

## Requirements

- VSCode 1.46.0 or later

## Project Settings

Configure your project by creating or updating a settings.json file at the project's root. If you already have a `.vscode/settings.json` file, skip the first two steps.

1. Open the command palette in VSCode:
   - `CTRL + SHIFT + P` (Windows)
   - `CMD + SHIFT + P` (Mac OS)

2. Type `Preferences: Open Workspace Settings (JSON)`.

3. In the `.vscode/settings.json` file, copy and paste the following settings:

    ```jsonc
    {
      "angular.standalone": true,
      "angular.style": "css"
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
| Angular: Generate Can Activate Guard | Generates a new, generic route guard definition |
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
| Angular: Generate Environments | Generates and configures environment files for a project |
| Angular: Start Server | Builds and serves your application, rebuilding on file changes |
| Angular: Run Tests | Runs unit tests in a project. |

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

## Other Repositories

- [NestJS Snippets for VSCode Editor](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-snippets-extension)
- [CodeIgniter 4 Snippets for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-shield-snippets)
- [CodeIgniter 4 Spark for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-shield-spark)
- [CodeIgniter 4 Essential Extension Pack for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-shield-pack)
- [Moodle Pack](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-moodle-snippets)
- [Mustache Template Engine - Snippets & Autocomplete](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-mustache-snippets)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - _Owner_ - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-angular-generator/contributors) who participated in this project.

## License

Angular File Generator for VSCode is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details.
