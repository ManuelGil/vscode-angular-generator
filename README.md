# Angular File Generator

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-angular-generator?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/vscode-angular-generator?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-angular-generator)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/vscode-angular-generator?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-angular-generator/blob/main/LICENSE)

This extension is designed to enhance your productivity by automating the creation of boilerplate code, allowing you to focus on building features rather than repetitive tasks. Whether you're a seasoned Angular developer or just starting out, this tool will help you maintain a clean and efficient codebase.

![demo](https://raw.githubusercontent.com/ManuelGil/vscode-angular-generator/main/docs/images/demo.gif)

![preview](https://raw.githubusercontent.com/ManuelGil/vscode-angular-generator/main/docs/images/preview.png)

## Table of Contents

- [Angular File Generator](#angular-file-generator)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [What's New](#whats-new)
  - [Features](#features)
    - [File Generation](#file-generation)
    - [Commands](#commands)
    - [Snippets](#snippets)
  - [Configuration](#configuration)
    - [Project Settings](#project-settings)
    - [Settings Options](#settings-options)
    - [Custom Commands \& Templates](#custom-commands--templates)
    - [File Naming Without Suffixes](#file-naming-without-suffixes)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [Follow Me](#follow-me)
  - [Other Extensions](#other-extensions)
  - [License](#license)

## Introduction

Are you tired of manually creating files for your Angular projects in Visual Studio Code? **Angular File Generator** eliminates repetitive boilerplate by generating classes, components, directives, services, and more with a handful of commands and snippets. With support for Angular 20's signal-based APIs and conventions, you'll spend less time setting up and more time building features.

## What's New

*This release updates Angular File Generator to support Angular 20 by including signal-based snippets (`signal`, `computed`, `effect`, `toSignal`) and removing redundant file suffixes (`.component.ts`, `.service.ts`) to streamline project structure and embrace Angular 20 conventions.*

## Features

### File Generation

| Title                         | Purpose                                         |
| ----------------------------- | ----------------------------------------------- |
| Angular: Generate Class       | Creates a new, generic class definition         |
| Angular: Generate Component   | Creates a new, generic component definition     |
| Angular: Generate Directive   | Creates a new, generic directive definition     |
| Angular: Generate Enum        | Generates a new, generic enum definition        |
| Angular: Generate Guard       | Generates a new, generic route guard definition |
| Angular: Generate Interceptor | Creates a new, generic interceptor definition   |
| Angular: Generate Interface   | Creates a new, generic interface definition     |
| Angular: Generate Module      | Creates a new, generic NgModule definition      |
| Angular: Generate Pipe        | Creates a new, generic pipe definition          |
| Angular: Generate Resolver    | Generates a new, generic resolver definition    |
| Angular: Generate Service     | Creates a new, generic service definition       |
| Angular: Generate Test        | Creates a new, generic test definition          |
| Angular: Generate Template    | Creates a new file with a template definition   |

### Commands

| Title                                | Purpose                                                                  |
| ------------------------------------ | ------------------------------------------------------------------------ |
| Angular: New Application             | Creates a new Angular application                                        |
| Angular: Start Server                | Builds and serves your application, rebuilding on file changes           |
| Angular: Version                     | Outputs Angular CLI version                                              |
| Angular: Run Tests                   | Runs unit tests in a project                                             |
| Angular: Run E2E                     | Builds and serves an Angular application, then runs end-to-end tests     |
| Angular: Disable Analytics           | Disables analytics gathering and reporting for the user                  |
| Angular: Enable Analytics            | Enables analytics gathering and reporting for the user                   |
| Angular: Info Analytics              | Prints analytics gathering and reporting configuration in the console    |
| Angular: Prompt Analytics            | Prompts the user to set analytics gathering status interactively         |
| Angular: Clean Cache                 | Deletes persistent disk cache from disk                                  |
| Angular: Disable Cache               | Disables persistent disk cache for all projects in the workspace         |
| Angular: Enable Cache                | Enables disk cache for all projects in the workspace                     |
| Angular: Info Cache                  | Prints persistent disk cache configuration and statistics in the console |
| Angular: Generate Component with CLI | Creates a new, generic component definition using Angular CLI            |
| Angular: Generate Guard with CLI     | Creates a new, generic guard definition using Angular CLI                |
| Angular: Generate Pipe with CLI      | Creates a new, generic pipe definition using Angular CLI                 |
| Angular: Generate Service with CLI   | Creates a new, generic service definition using Angular CLI              |
| Angular: Generate Environments       | Generates and configures environment files for a project                 |
| Angular: Generate Library            | Creates a new, generic library project in the current workspace          |

### Snippets

| Prefix                                     | Purpose                                      |
| ------------------------------------------ | -------------------------------------------- |
| `ng_class_module`                          | `export class Module {}`                     |
| `ng_class_routing_module`                  | `export class RoutingModule {}`              |
| `ng_const_routes`                          | `export const routes: Routes = []`           |
| `ng_class_component`                       | `export class Component {}`                  |
| `ng_class_standalone_component`            | `export class Component {}`                  |
| `ng_class_service`                         | `export class Service {}`                    |
| `ng_const_environment`                     | `export const environment = {}`              |
| `ng_oninit`                                | `ngOnInit {}`                                |
| `ng_on_destroy`                            | `ngOnDestroy {}`                             |
| `ng_unsubscribe`                           | `private unsubscribe: Subscription[] = []`   |
| `ng_subscribe`                             | `this.unsubscribe.push(this.subscr);`        |
| `ng_signal`                                | `const mySignal = signal(...)`               |
| `ng_computed`                              | `const myComputed = computed(() => ...)`     |
| `ng_effect`                                | `effect(() => ...)`                          |
| `ng_linked_signal`                         | `const myLinkedSignal = linkedSignal(...)`   |
| `ng_to_signal`                             | `const signalFromObservable = toSignal(...)` |
| `ng_resource`                              | `const myResource = resource(() => ...)`     |
| `ng_class_standalone_component_reactivity` | `export class Component {}`                  |
| `ng_on_destroy_reactivity`                 | `implements OnDestroy {}`                    |
| `ng_if`                                    | `@if (condition) {}`                         |
| `ng_if_else`                               | `@if (condition) {} @else {}`                |
| `ng_if_else_if`                            | `@if (condition) {} @else if (condition) {}` |
| `ng_else_if`                               | `@else if (condition) {}`                    |
| `ng_else`                                  | `@else {}`                                   |
| `ng_for`                                   | `@for (condition) {}`                        |
| `ng_empty`                                 | `@empty {}`                                  |
| `ng_switch`                                | `@switch (condition) {}`                     |
| `ng_case`                                  | `@case (condition) {}`                       |
| `ng_default`                               | `@default {}`                                |
| `ng_defer`                                 | `@defer (condition) {}`                      |
| `ng_placeholder`                           | `@placeholder {}`                            |
| `ng_loading`                               | `@loading {}`                                |
| `ng_router_outlet`                         | `<router-outlet></router-outlet>`            |
| `ng_router_link`                           | `<a routerLink=""></a>`                      |

## Configuration

### Project Settings

To customize the extension's behavior, create or update a `.vscode/settings.json` file at your project's root. If you already have one, simply merge these properties.

```jsonc
{
  "angular.enable": true,                    // Enable or disable the extension
  "angular.components.standalone": true,     // Generate standalone components by default
  "angular.components.style": "css",          // Default style extension for new components
  "angular.files.include": ["ts"],            // File extensions to include
  "angular.files.exclude": [                  // Glob patterns to exclude
    "**/node_modules/**",
    "**/dist/**",
    "**/out/**",
    "**/build/**",
    "**/.*/**"
  ],
  "angular.files.watch": [                    // Folders to watch
    "modules",
    "components",
    "services"
  ],
  "angular.files.showPath": true,             // Show file path in the sidebar view
  "angular.terminal.cwd": "/absolute/path/to/your/project/", // Terminal CWD
  "angular.submenu.customCommands": [         // Custom commands in the submenu
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
  "angular.submenu.templates": [              // Templates in the submenu
    {
      "name": "Template 1",
      "description": "Creates a custom component file",
      "type": "component",
      "template": [
        "import { Component, OnInit } from '@angular/core';",
        "",
        "@Component({",
        "  selector: '{{EntityName}}',",
        "  templateUrl: './{{EntityName}}.component.html',",
        "  styleUrls: ['./{{EntityName}}.component.css']",
        "})",
        "export class {{ComponentName}}Component implements OnInit {",
        "",
        "  constructor() { }",
        "",
        "  ngOnInit(): void { }",
        "",
        "}"
      ]
    }
  ],
  "angular.submenu.activateItem": {           // Activate items in the submenu
    "terminal": {
      "component": true,
      "guard": true,
      "pipe": true,
      "service": true,
      "custom": true
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
      "spec": true,
      "template": true
    }
  },
  "angular.fileGenerator.skipFolderConfirmation": false, // Skip folder confirmation when generating a new file
  "angular.fileGenerator.omitSuffix": false, // Omit suffix when generating a new file
  "angular.fileGenerator.typeSeparator": ".", // The type separator used in the file name
}
```

Your project is now set up to automatically format code upon saving.

### Settings Options

| Setting                                        | Description                                                                     | Default                               |
| ---------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------- |
| `angular.enable`                               | Enable or disable the extension                                                 | `true`                                |
| `angular.components.standalone`                | Generate standalone components by default                                       | `true`                                |
| `angular.components.style`                     | Default style file extension for new components (`css`, `scss`, etc.)           | `css`                                 |
| `angular.files.include`                        | File extensions to include in the sidebar                                       | `["ts"]`                              |
| `angular.files.exclude`                        | Glob patterns to exclude from the sidebar                                       | `["**/node_modules/**", ...]`         |
| `angular.files.watch`                          | Folders (by type) to watch in the sidebar (`modules`, `components`, `services`) | `["modules","components","services"]` |
| `angular.files.showPath`                       | Show file paths in the sidebar                                                  | `true`                                |
| `angular.terminal.cwd`                         | Absolute path for terminal current working directory                            |                                       |
| `angular.submenu.customCommands`               | List of custom CLI commands to show under a submenu                             | `[]`                                  |
| `angular.submenu.templates`                    | List of custom file templates for quick generation                              | `[]`                                  |
| `angular.submenu.activateItem`                 | Items (by category) to activate in the submenu                                  | { see example }                       |
| `angular.fileGenerator.skipFolderConfirmation` | Skip folder confirmation dialog when generating files                           | `false`                               |
| `angular.fileGenerator.omitSuffix`             | Omit file suffixes (e.g., `.component.ts`, `.service.ts`)                       | `false`                               |
| `angular.fileGenerator.typeSeparator`          | Separator between name and type in filenames (e.g., `name.type.ts`)             | `"."`                                 |

### Custom Commands & Templates

- **Custom Commands** (`angular.submenu.customCommands`):
  Define aliases for frequently used Angular CLI commands, including custom flags.

  ```jsonc
  "angular.submenu.customCommands": [
    {
      "name": "Generate Feature Component",
      "command": "ng g c",
      "args": "--style scss --standalone true"
    }
  ]
  ```

- **Custom Templates** (`angular.submenu.templates`):
  Provide code templates for generating files with placeholders. Use `{{ComponentName}}` and `{{EntityName}}` (or custom placeholders) to insert names automatically.

### File Naming Without Suffixes

Angular 19 and earlier generated filenames with explicit suffixes:

- **Before (Angular ≤19)**

  - `ng g c user` → `user.component.ts` (exports `class UserComponent`)
  - `ng g s user` → `user.service.ts` (exports `class UserService`)

Angular 20 conventions encourage simpler filenames:

- **Now (Angular 20)**

  - `ng g c user` → `user.ts` (exports `class User`)
  - `ng g s user` → `user.ts` (exports `class User`)

This extension now follows this convention by default, generating files without the `.component.ts` or `.service.ts` suffixes. For enabling this behavior, you can set the `angular.fileGenerator.omitSuffix` option to `true` in your project's `.vscode/settings.json` file.

```jsonc
{
  "angular.fileGenerator.omitSuffix": true
}
```

This aligns with Angular 20's approach to file naming and simplifies your project structure.

> **Tip:** To restore the old `.component.ts` / `.service.ts` suffixes, add the following to your project's `angular.json`:
>
> ```jsonc
> {
>   "projects": {
>     "your-app": {
>       "schematics": {
>         "@schematics/angular:component": { "type": "component" },
>         "@schematics/angular:directive": { "type": "directive" },
>         "@schematics/angular:service": { "type": "service" },
>         "@schematics/angular:guard": { "typeSeparator": "." },
>         "@schematics/angular:interceptor": { "typeSeparator": "." },
>         "@schematics/angular:module": { "typeSeparator": "." },
>         "@schematics/angular:pipe": { "typeSeparator": "." },
>         "@schematics/angular:resolver": { "typeSeparator": "." }
>       }
>     }
>   }
> }
> ```

## Contributing

Angular File Generator is open-source and welcomes community contributions:

1. Fork the [GitHub repository](https://github.com/ManuelGil/vscode-angular-generator).
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes, commit them, and push to your fork.
4. Submit a Pull Request against the `main` branch.

Before contributing, please read the [Contribution Guidelines](./CONTRIBUTING.md) for coding standards, testing, and commit message conventions.

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or similar personal characteristic. Please review our [Code of Conduct](./CODE_OF_CONDUCT.md) before participating in our community.

## Changelog

For a complete list of changes, see the [CHANGELOG.md](./CHANGELOG.md)

## Authors

- **Manuel Gil** - *Owner* - [ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-angular-generator/contributors) who participated in this project.

## Follow Me

If you enjoy using this extension, consider following me for updates on this and future projects:

[![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge&logo=github)](https://github.com/ManuelGil)
[![X (formerly Twitter) Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge&logo=x)](https://twitter.com/imgildev)

## Other Extensions

- [Angular File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
- [NestJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-generator)
- [T3 Stack / NextJS / ReactJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)
- [JSON Flow](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-json-flow)
- [Auto Barrel](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)
- [CodeIgniter 4 Spark](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)

## License

Angular File Generator is licensed under the MIT License - see the [MIT License](https://opensource.org/licenses/MIT) for details.
