# Angular File Generator

[![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/imgildev.vscode-angular-generator?style=for-the-badge&label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
[![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/imgildev.vscode-angular-generator?style=for-the-badge&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator&ssr=false#review-details)
[![GitHub Repo stars](https://img.shields.io/github/stars/ManuelGil/vscode-angular-generator?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-angular-generator)
[![GitHub license](https://img.shields.io/github/license/ManuelGil/vscode-angular-generator?style=for-the-badge&logo=github)](https://github.com/ManuelGil/vscode-angular-generator/blob/main/LICENSE)

## Supercharge Your Angular Development

> _**Speed up your workflow with a single click!** Angular File Generator integrates Angular CLI seamlessly into any VSCode-based editor, eliminating nested menus and boosting productivity. From Angular 9 to Angular 20+, create files, navigate code, and transform components instantly. Save time. Write better code. Ship faster._

### Key Benefits

- **Time-Saving** - Generate components, services, modules with just one click
- **Clean Workspace** - Navigate your Angular project with specialized sidebar views
- **Custom Templates** - Create your own reusable file templates and snippets
- **Modern Development** - Built-in support for Angular's new Signals, Effects & Reactivity

- [![Watch the demo](https://img.youtube.com/vi/4UW8UQly4v0/maxresdefault.jpg)](https://youtu.be/4UW8UQly4v0?feature=shared)

## Table of Contents

- [Angular File Generator](#angular-file-generator)
  - [Supercharge Your Angular Development](#supercharge-your-angular-development)
    - [Key Benefits](#key-benefits)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [What's New](#whats-new)
  - [Features](#features)
    - [File Generation](#file-generation)
    - [Commands](#commands)
    - [Snippets](#snippets)
  - [Main Features](#main-features)
    - [Flat, Descriptive Context Menu](#flat-descriptive-context-menu)
    - [Sidebar "Angular File Generator" Panel](#sidebar-angular-file-generator-panel)
    - [Naming \& Styling: Legacy vs. Angular 20+](#naming--styling-legacy-vs-angular-20)
      - [A. Legacy Mode (Angular 9–19)](#a-legacy-mode-angular-919)
      - [B. Angular 20+ Mode](#b-angular-20-mode)
    - [Built-In Reactivity Snippets \& Templates (Angular 20+)](#built-in-reactivity-snippets--templates-angular-20)
  - [Configuration](#configuration)
    - [Essential Project Configuration](#essential-project-configuration)
    - [Settings Options](#settings-options)
    - [Placeholders in customCommands and templates](#placeholders-in-customcommands-and-templates)
    - [File Naming Without Suffixes](#file-naming-without-suffixes)
  - [Usage](#usage)
  - [Installation](#installation)
  - [Resources](#resources)
  - [Contributing](#contributing)
  - [Code of Conduct](#code-of-conduct)
  - [Changelog](#changelog)
  - [Authors](#authors)
  - [Follow Me](#follow-me)
  - [Other Extensions](#other-extensions)
  - [License](#license)

## Description

Angular File Generator integrates the Angular CLI into any VSCode-based editor, such as VSCode, VSCodium, WindSurf, Cursor, or others, to provide file generation and project navigation without nested menus. With Angular File Generator you can:

- Create **Components**, **Services**, **Modules**, **Pipes**, **Guards**, **Interceptors**, **Resolvers**, **Directives**, **Classes**, **Enums**, **Interfaces**, **Tests (specs)**, and **Templates** with one click.
- Execute Angular CLI commands (`ng generate`) from VSCode using convenient shortcuts.
- Define custom templates to generate files with your own boilerplate.
- Transform JSON blocks into TypeScript interfaces on the fly.
- Explore files, routes, and modules from a dedicated sidebar panel.
- Access native **snippets** for Angular 20+ reactivity APIs (signals, computed, effect, etc.).

Angular File Generator supports projects from Angular 9 through Angular 20+ and is ready to adopt Angular 20 conventions and new features, such as "omit suffix" filenames, dash-separated naming, and standalone components.

## What's New

This release updates Angular File Generator to support Angular 20 by including signal-based snippets (`signal`, `computed`, `effect`, `toSignal`) and removing redundant file suffixes (`.component.ts`, `.service.ts`) to streamline project structure and embrace Angular 20 conventions.

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

## Main Features

### Flat, Descriptive Context Menu

Angular File Generator adds a single entry to the Explorer's context menu in any VSCode-based editor, no nested submenus. From there you can:

- **Generate Component / Service / Module / Pipe / Guard / Interceptor / Resolver / Directive / Class / Enum / Interface / Spec / Template**
  - Opens a dialog to enter the name and default flags (e.g., `--style=scss`, `--standalone` if enabled).
  - Internally invokes `ng generate <artifact> <name> --flags...` or uses a built-in boilerplate engine.

- **Generate with CLI → [same list of artifacts]**
  - Shows the exact same list but delegates directly to `ng generate`.
  - If your settings have `angular.fileGenerator.omitSuffix: true` and `typeSeparator: "-"`, it generates files using Angular 20 conventions (e.g., `user-profile.ts` instead of `user-profile.component.ts`).

- **Generate Custom (Templates)**
  - If you define `angular.submenu.templates` in your settings, each custom template appears here.
  - Selecting a template prompts you for values like `{{ComponentName}}`, `{{entityName}}`, or `{{style}}`, then generates the corresponding files with those placeholders replaced.

- **Transform JSON to TS**
  - Select a JSON block in the editor, right-click → "Angular File Generator → Transform JSON to TS." Angular File Generator uses `json-to-ts` to generate a TypeScript interface with detected fields and types.

### Sidebar "Angular File Generator" Panel

Angular File Generator adds a new icon to VSCode's Activity Bar. Clicking it opens a panel with four lists:

1. **List Files**
   - **Settings**:
     - `angular.files.include`: which extensions to show (e.g., `["ts"]`).
     - `angular.files.exclude`: glob patterns to hide folders/files (e.g., `"**/node_modules/**"`).
     - `angular.files.watch`: which folders or name patterns to group files (e.g., "modules," "components").
     - `angular.files.showPath`: if `true`, appends the folder path in parentheses (e.g., `layout.module.ts (src/app/...)`).
   - **Behavior**:
     - A TreeView: expand a group (e.g., "Modules: 64") to see its files.
     - Click a file to open it at the correct line.
     - No right-click actions, just click to open.

2. **List Routes**
   - **Behavior**:
     - Shows each routing module (e.g., `app-routing.module.ts`) with its routes (`path: 'auth'`, `path: ''`, etc.).
     - Click a route to open that file and jump to its definition.
     - "Refresh" button reloads the list after changes.
     - No right-click, just click.

3. **List Modules**
   - **Behavior**:
     - Lists each `*.module.ts` file (e.g., `layout.module.ts`) with child entries for `declarations`, `imports`, and `exports`.
     - Click any entry to open the file and scroll to that section.
     - "Refresh" button updates the list.
     - No right-click, just click.

4. **Feedback**
   - **Behavior**:
     - A simple list: About Us, Report Issues, Rate Us, Support Us.
     - Click an item to open its link in your browser.
     - No right-click, just click.

### Naming & Styling: Legacy vs. Angular 20+

Angular File Generator offers two naming modes for files and classes:

#### A. Legacy Mode (Angular 9–19)

```jsonc
"angular.fileGenerator.omitSuffix": false,
"angular.fileGenerator.typeSeparator": "."
````

- Generates traditional names like `my-component.component.ts`, `my-service.service.ts`, etc.
- Ideal if you maintain older conventions and don't want structural changes to filenames.

#### B. Angular 20+ Mode

```jsonc
"angular.fileGenerator.omitSuffix": true,
"angular.fileGenerator.typeSeparator": "-"
```

- Creates dash-separated filenames without redundant suffixes. Examples:

  - `user-profile.ts` (instead of `user-profile.component.ts`)
  - `auth-service.ts` (instead of `auth-service.service.ts`)

- If you also set `"angular.components.standalone": true`, Angular File Generator generates standalone components that include `standalone: true` and import `CommonModule`.

This flexibility lets you migrate gradually between conventions without reconfiguring every template manually.

### Built-In Reactivity Snippets & Templates (Angular 20+)

Although Angular File Generator **does not** include full templates that automatically inject `signal`, `computed`, etc., it provides several **snippets** to help you adopt Angular 20's reactivity APIs more quickly. Just type the prefix and press Tab:

1. **Signal** (`ng_signal`)

   ```ts
   import { signal } from '@angular/core';
   const mySignal = signal(initialValue);
   ```

2. **Computed** (`ng_computed`)

   ```ts
   import { computed } from '@angular/core';
   const myComputed = computed(() => expression);
   ```

3. **Effect** (`ng_effect`)

   ```ts
   import { effect } from '@angular/core';
   effect(() => {
     // reactive logic
   });
   ```

4. **LinkedSignal** (`ng_linked_signal`)

   ```ts
   import { linkedSignal } from '@angular/core';
   const myLinkedSignal = linkedSignal(sourceSignal, (v) => transformation);
   ```

5. **ToSignal** (`ng_to_signal`)

   ```ts
   import { toSignal } from '@angular/core/rxjs-interop';
   const signalFromObs = toSignal(myObservable, { initialValue: defaultValue });
   ```

6. **Resource** (`ng_resource`)

   ```ts
   import { resource } from '@angular/core';
   const myResource = resource(() => fetch('/api/data').then(r => r.json()));
   ```

> **Custom Templates:**
> To generate a full file that already includes imports of `signal`, `computed`, or effects, create your own template under `angular.submenu.templates` (see the "Configuration" section). That way you can copy complete examples and adapt them to your project.

## Configuration

### Essential Project Configuration

Add these options to your `.vscode/settings.json` to get the most out of Angular File Generator. Adjust values according to your team's conventions.

```jsonc
{
  // 1. Enable/Disable the extension
  "angular.enable": true,

  // 2. Standalone components by default
  "angular.components.standalone": true,
  "angular.components.style": "scss",    // 'css', 'less', 'sass', 'styl'

  // 3. Naming mode (Legacy vs. Angular 20+)
  "angular.fileGenerator.omitSuffix": true,   // true for Angular 20+ (omit .component.ts, .service.ts, etc.)
  "angular.fileGenerator.typeSeparator": "-",  // '-' for dash-separated; '.' for legacy
  "angular.fileGenerator.skipFolderConfirmation": false, // true to skip folder-confirmation dialogs

  // 4. Filters for "List Files"
  "angular.files.include": ["ts"],
  "angular.files.exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/.*/**"
  ],
  "angular.files.watch": ["modules", "components", "services"], // folders to scan
  "angular.files.showPath": true, // show full path in list

  // 5. Working directory for CLI commands (monorepo)
  "angular.terminal.cwd": "packages/my-angular-app", // adjust to your structure

  // 6. Custom CLI commands
  "angular.submenu.customCommands": [
    {
      "name": "Feature Module (OnPush + Routing)",
      "command": "ng g m",
      "args": "--routing --flat --change-detection OnPush"
    }
  ],

  // 7. Custom templates
  "angular.submenu.templates": [
    {
      "name": "Corporate Component",
      "description": "Component with header + basic logging",
      "type": "component",
      "template": [
        "/* Company XYZ – Confidential */",
        "import { Component } from '@angular/core';",
        "import { LoggingService } from 'src/app/shared/logging.service';",
        "@Component({",
        "  selector: 'app-{{entityName}}',",
        "  standalone: true,",
        "  imports: [CommonModule],",
        "  templateUrl: './{{entityName}}.component.html',",
        "  styleUrls: ['./{{entityName}}.component.{{style}}'],",
        "})",
        "export class {{ComponentName}}Component {",
        "  constructor(private logger: LoggingService) {",
        "    this.logger.log('{{ComponentName}} initialized');",
        "  }",
        "}"
      ]
    }
  ]
}
```

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
| `angular.terminal.cwd`                         | Absolute path for terminal current working directory                            | `(none)`                              |
| `angular.submenu.customCommands`               | List of custom CLI commands to show under a submenu                             | `[]`                                  |
| `angular.submenu.templates`                    | List of custom file templates for quick generation                              | `[]`                                  |
| `angular.submenu.activateItem`                 | Items (by category) to activate in the submenu                                  | `{ see example }`                     |
| `angular.fileGenerator.skipFolderConfirmation` | Skip folder confirmation dialog when generating files                           | `false`                               |
| `angular.fileGenerator.omitSuffix`             | Omit file suffixes (e.g., `.component.ts`, `.service.ts`)                       | `false`                               |
| `angular.fileGenerator.typeSeparator`          | Separator between name and type in filenames (e.g., `name.type.ts`)             | `"."`                                 |

### Placeholders in customCommands and templates

You can now use dynamic placeholders `{{ComponentName}}`, `{{entityName}}`, and `{{style}}` in your **customCommands** and **customTemplates**. After selecting a template or custom command:

1. VS Code will prompt you for each placeholder:
   - **ComponentName**: must be PascalCase (e.g. `UserProfile`)
   - **entityName**: camelCase or kebab-case (e.g. `userProfile` or `user-profile`)
   - **style**: style extension (e.g. `scss`, `css`), default taken from your config

2. The extension will substitute each `{{Key}}` with your input before running the command or writing the file.

Example in `.vscode/settings.json`:

```jsonc
"angular.submenu.customCommands": [
  {
    "name": "Custom Component",
    "command": "ng g c",
    "args": "{{entityName}} --style {{style}} --standalone true --change-detection OnPush"
  }
],
"angular.submenu.templates": [
  {
    "name": "Corporate Component",
    "description": "Component with header + basic logging",
    "type": "component",
    "template": [
      "import { Component } from '@angular/core';",
      "@Component({",
      "  selector: 'app-{{entityName}}',",
      "  templateUrl: './{{entityName}}.component.html',",
      "  styleUrls: ['./{{entityName}}.component.{{style}}'],",
      "})",
      "export class {{ComponentName}}Component {",
      "  constructor() { }",
      "}"
    ]
  }
]
```

| Placeholder         | Description                                                                                                     |
| ------------------- | --------------------------------------------------------------------------------------------------------------- |
| `{{ComponentName}}` | Prompts for a PascalCase class name (e.g. `User`, `AuthService`).                                               |
| `{{entityName}}`    | Prompts for an entity name in camelCase or kebab-case (e.g. `user`, `user-profile`).                            |
| `{{style}}`         | Uses your configured style (e.g. `scss`, `css`) without prompting if defined; else prompts for style extension. |

### File Naming Without Suffixes

Angular 19 and earlier generated filenames with explicit suffixes:

- **Before (Angular ≤19)**

  - `ng g c user` → `user.component.ts` (exports `class UserComponent`)
  - `ng g s user` → `user.service.ts` (exports `class UserService`)

Angular 20 conventions encourage simpler filenames:

- **Now (Angular 20)**

  - `ng g c user` → `user.ts` (exports `class User`)
  - `ng g s user` → `user.ts` (exports `class User`)

This extension follows this convention by default, generating files without the `.component.ts` or `.service.ts` suffixes. To enable this behavior, set `angular.fileGenerator.omitSuffix` to `true` in your `.vscode/settings.json`.

```jsonc
{
  "angular.fileGenerator.omitSuffix": true
}
```

This aligns with Angular 20's approach to file naming and simplifies your project structure.

> **Tip:** To restore the old `.component.ts` / `.service.ts` suffixes, add the following to your `angular.json`:
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

## Usage

1. **Open an Angular project** in your VSCode-based editor (Angular 9 → Angular 20+).
2. **Ensure** that your `settings.json` has `"angular.enable": true`.
3. In the **Explorer**, right-click on a folder or file, select **"Angular File Generator"**, and choose an action:

   - Generate a component, service, module, pipe, guard, etc.
   - Transform JSON to TS.
   - Run an Angular CLI command.
   - Use a custom template.

4. To use the **Command Palette**, press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS), type "Angular File Generator," and pick the desired command.
5. To **browse your code** with side panels:

   - Click the Angular File Generator icon in the Activity Bar.
   - Navigate under "List Files," "List Routes," or "List Modules."
   - Use the "Refresh" button after adding or removing files, routes, or modules.

6. To **create custom templates** that include imports for signals, computed, etc., edit `angular.submenu.templates` in your `settings.json` following the structure shown above.

## Installation

1. Open your VSCode-based editor (e.g., VSCode, VSCodium, WindSurf, Cursor).
2. Go to the **Extensions** view (`Ctrl+Shift+X` / `Cmd+Shift+X`).
3. Search for **"Angular File Generator"** (author: Manuel Gil).
4. Click **Install**.
5. (Optional) Clone or download the repository and open the folder in VSCode to test the latest development version.

## Resources

- **VSCode Marketplace**:
  [https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)
- **Open VSX**:
  [https://open-vsx.org/extension/imgildev/vscode-angular-generator](https://open-vsx.org/extension/imgildev/vscode-angular-generator)
- **GitHub Repository**:
  [https://github.com/ManuelGil/vscode-angular-generator](https://github.com/ManuelGil/vscode-angular-generator)
- **Angular CLI Documentation**:
  [https://angular.io/cli](https://angular.io/cli)
- **Angular 20 Signals Guide**:
  [https://angular.io/guide/signals](https://angular.io/guide/signals)

## Contributing

Angular File Generator is open-source and welcomes community contributions:

1. Fork the [GitHub repository](https://github.com/ManuelGil/vscode-angular-generator).
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature
   ```

3. Make your changes, commit them, and push to your fork.
4. Submit a Pull Request against the `main` branch.

Before contributing, please review the [Contribution Guidelines](https://github.com/ManuelGil/vscode-angular-generator/blob/main/CONTRIBUTING.md) for coding standards, testing, and commit message conventions. Open an Issue if you find a bug or want to request a new feature.

## Code of Conduct

We are committed to providing a friendly, safe, and welcoming environment for all, regardless of gender, sexual orientation, disability, ethnicity, religion, or other personal characteristic. Please review our [Code of Conduct](https://github.com/ManuelGil/vscode-angular-generator/blob/main/CODE_OF_CONDUCT.md) before participating in our community.

## Changelog

For a complete list of changes, see the [CHANGELOG.md](https://github.com/ManuelGil/vscode-angular-generator/blob/main/CHANGELOG.md).

## Authors

- **Manuel Gil** – _Owner_ – [@ManuelGil](https://github.com/ManuelGil)

See also the list of [contributors](https://github.com/ManuelGil/vscode-angular-generator/contributors) who participated in this project.

## Follow Me

- **GitHub**: [![GitHub followers](https://img.shields.io/github/followers/ManuelGil?style=for-the-badge\&logo=github)](https://github.com/ManuelGil)
- **X (formerly Twitter)**: [![X Follow](https://img.shields.io/twitter/follow/imgildev?style=for-the-badge\&logo=x)](https://twitter.com/imgildev)

## Other Extensions

- **[Auto Barrel](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-auto-barrel)**
  Automatically generates and maintains barrel (`index.ts`) files for your TypeScript projects.

- **[Angular File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-angular-generator)**
  Generates boilerplate and navigates your Angular (9→20+) project from within the editor, with commands for components, services, directives, modules, pipes, guards, reactive snippets, and JSON2TS transformations.

- **[NestJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-generator)**
  Simplifies creation of controllers, services, modules, and more for NestJS projects, with custom commands and Swagger snippets.

- **[NestJS Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nestjs-snippets-extension)**
  Ready-to-use code patterns for creating controllers, services, modules, DTOs, filters, interceptors, and more in NestJS.

- **[T3 Stack / NextJS / ReactJS File Generator](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-nextjs-generator)**
  Automates file creation (components, pages, hooks, API routes, etc.) in T3 Stack (Next.js, React) projects and can start your dev server from VSCode.

- **[Drizzle ORM Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-drizzle-snippets)**
  Collection of code snippets to speed up Drizzle ORM usage, defines schemas, migrations, and common database operations in TypeScript/JavaScript.

- **[CodeIgniter 4 Spark](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-spark)**
  Scaffolds controllers, models, migrations, libraries, and CLI commands in CodeIgniter 4 projects using Spark, directly from the editor.

- **[CodeIgniter 4 Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-snippets)**
  Snippets for accelerating development with CodeIgniter 4, including controllers, models, validations, and more.

- **[CodeIgniter 4 Shield Snippets](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-codeigniter4-shield-snippets)**
  Snippets tailored to CodeIgniter 4 Shield for faster authentication and security-related code.

- **[Mustache Template Engine – Snippets & Autocomplete](https://marketplace.visualstudio.com/items?itemName=imgildev.vscode-mustache-snippets)**
  Snippets and autocomplete support for Mustache templates, making HTML templating faster and more reliable.

## License

This project is licensed under the **MIT License**. See the [LICENSE](https://github.com/ManuelGil/vscode-angular-generator/blob/main/LICENSE) file for details.
