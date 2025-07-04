# Change Log

All notable changes to the "Angular File Generator" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.15.2] - 2025-07-04

### Changed

- Enhance documentation and clarity across `controllers`, `helpers`, and `providers`

## [2.15.1] - 2025-06-09

### Fixed

- Improve `command.helper.ts` with enhanced error handling and resource management

## [2.15.0] - 2025-06-09

### Added

- Add centralized validation helpers for folder, class, and entity names
- Refactor `FileController` and `TerminalController` to utilize new validation functions
- Improve command execution handling in `command.helper.ts` to support output capturing and cancellation

## [2.14.0] - 2025-06-08

### Changed

- Improve localization support for error messages and placeholders in `terminal.controller.ts`
- Improve file handling in `filesystem.helper.ts` with progress notifications and error handling
- Improve command execution to show progress notifications in `command.helper.ts`

### Fixed

- Fix potential runtime error in the `generateCustomElement` method by safely checking regex match results
- Unified validation message handling across controllers

## [2.13.0] - 2025-06-04

### Added

- Add `angular.fileGenerator.omitSuffix` setting to omit the suffix from the generated file names in the context menu
- Add `angular.fileGenerator.typeSeparator` setting to customize the separator between the file type and the file name in the context menu
- Add snippets for `signal`, `computed`, `effect`, and `toSignal` APIs for Angular 20

## [2.12.0] - 2025-03-10

### Added

- Add `vscode-marketplace-client` dependency to check for extension updates and display a notification

### Changed

- Update the `extension.ts` file to use the new `vscode-marketplace-client` dependency
- Update Localization strings for the extension

## [2.11.0] - 2025-01-20

### Added

- Add custom templates feature with configuration and localization updates

## [2.10.0] - 2025-01-06

### Added

- Add `enable` settings to enable or disable the extension

### Fixed

- Fix typos the file generation process

## [2.9.1] - 2024-12-24

### Fixed

- Fix the folder path validation issue when generating a file

## [2.9.0] - 2024-12-23

### Added

- Add `fileGenerator.skipFolderConfirmation` settings to skip the folder confirmation when generating a file
- Add VS Code test configuration and update test scripts

### Changed

- Improve the file generation process to skip the folder confirmation when the setting is enabled
- Improve the welcome and update messages in the extension
- Update localization files to include the new settings
- Update the `extension.ts` file to observer to the configuration changes
- Update the `config.ts` file to include the new settings
- Update the `package.json` file to include the new settings
- Upgrade dependencies to the latest versions available

## [2.8.1] - 2024-11-22

### Fixed

- Enhance workspace folder handling to support multiple workspace folders.

## [2.8.0] - 2024-11-20

### Added

- Add Customizable Working Directory setting to set the working directory for the extension
- Add version extension check to show a message when the extension is outdated

## [2.7.0] - 2024-11-07

### Added

- Add Spanish language support to the extension

## [2.6.0] - 2024-05-28

### Added

- Add `submenu.customCommands` settings to customize the commands in the context menu
- Add `generateCustomElement` command to generate a custom element

### Changed

- Update the `extension.ts` file to use the new `submenu.customCommands` settings
- Update the `package.json` file to include the new settings

## [2.5.0] - 2024-05-26

### Added

- Add `submenu.activateItem` settings to enable or disable the items in the context menu

### Changed

- Update the `extension.ts` file to use the new `submenu.activateItem` settings
- Update the `package.json` file to include the new settings

## [2.4.1] - 2024-05-12

### Changed

- Update the `README.md` file to improve the contribution guidelines

### Fixed

- Fix the directive file name to use the correct type of file

## [2.4.0] - 2024-03-28

### Changed

- Update the `getFiles` method in the `ListFilesController` so that it can be used without instantiating the class
- Update the `ListFilesProvider` and `ListRoutesProvider` to use the new `getFiles` method
- Upgrade dependencies to the latest versions available

## [2.3.2] - 2024-03-04

### Fixed

- Fix the list of routes view to show only the route names

## [2.3.1] - 2024-03-04

### Fixed

- Fix settings to show the path in the file name

## [2.3.0] - 2024-03-04

### Added

- Add `Show Path In File Name` setting to show the path in the file name

## [2.2.0] - 2024-03-02

### Added

- Add List of Routes View

### Changed

- Update `TerminalController` to improve the file generation process through the terminal

### Fixed

- Fix documentation

## [2.1.1] - 2024-02-19

### Fixed

- Fix sorting of files in the list of files view to show alphabetically the files
- Fix empty list of modules view when there are no modules to show a welcome message
- Fix empty list of files view when there are no files to show a welcome message
- Fix order of the imports in the controllers and providers files
- Fix documentation in the README file

## [2.1.0] - 2024-02-14

### Added

- Add List of Modules View
- Add List of Files View
- Add Feedback View
- Add file includes section to the settings
- Add file excludes section to the settings
- Add file to watch section to the settings
- Add compodoc dependencies for the documentation generation

### Changed

- Update `Config` class to allow the file includes, file excludes and file to watch settings
- Update `Constants` to allow the file includes, file excludes and file to watch settings
- Update `NodeModel` class to allow the child nodes to be added
- Update `package.json` to include the new commands and views
- Update `package.json` to include the new dependencies
- Update `package.json` to include the new scripts
- Update `package.json` to include the new settings

### Fixed

- Fix documentation generation

## [2.0.0] - 2024-02-11

### Changed

- Refactor the folder structure of the extension to improve the codebase
- Improve the generation of the files to use the new folder structure

## [1.9.0] - 2024-01-15

### Added

- Add convert json to ts command

### Changed

- Improve file generation

## [1.8.0] - 2024-01-11

### Added

- Add e2e and version commands

### Changed

- Improve context menu options

### Removed

- Remove file name restriction

## [1.7.0] - 2024-01-09

### Added

- Add Generate Guard command
- Add Generate Pipe command
- Add Generate Service command
- Add Generate Library command

### Changed

- Improve interface generation
- Improve component generation

## [1.6.3] - 2023-12-30

### Fixed

- Improve docuemntation

## [1.6.2] - 2023-12-23

### Fixed

- Fix guards file name

## [1.6.1] - 2023-12-22

### Fixed

- Fix title of the context menu

## [1.6.0] - 2023-12-22

### Changed

- Improve context menu

## [1.5.1] - 2023-12-21

### Fixed

- Fix Guard file

## [1.5.0] - 2023-12-21

### Changed

- Update Guard file

### Fixed

- Fix snippets

## [1.4.0] - 2023-12-14

### Added

- Add test command

### Fixed

- Fix standalone component command

## [1.3.0] - 2023-12-13

### Added

- Add new snippets

## [1.2.1] - 2023-12-12

### Fixed

- Fix of active workspace detection

## [1.2.0] - 2023-12-12

### Added

- Add Local Project Settings capability

## [1.1.0] - 2023-12-10

### Added

- Add configs
- Add standalone component snippets
- Add component options

### Fixed

- Fix service generation

## [1.0.0] - 2023-12-08

### Added

- Add file generetor functions
- Add Disable Analytics command
- Add Enable Analytics command
- Add Info Analytics command
- Add Prompt Analytics command
- Add Clean Cache command
- Add Disable Cache command
- Add Enable Cache command
- Add Info Cache command
- Add Generate Component command
- Add Generate Environments command
- Add Start Server command
- Add export class Module snippet
- Add export class RoutingModule snippet
- Add export class Component snippet
- Add export class Service snippet
- Add unsubscribe snippets
- Add ngOnDestroy snippet
- Add ngOnInit snippet
- Add export const environmentsnippet
- Add @if, @else snippets
- Add @for snippet
- Add @empty snippet
- Add @switch snippet
- Add @case snippet
- Add @default snippet
- Add router-outlet snippet
- Add router-link snippet

## [0.1.0] - 2023-12-08

- Initial release

[unreleased]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.15.2...HEAD
[2.15.2]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.15.1...v2.15.2
[2.15.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.15.0...v2.15.1
[2.15.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.14.0...v2.15.0
[2.14.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.13.0...v2.14.0
[2.13.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.12.0...v2.13.0
[2.12.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.11.0...v2.12.0
[2.11.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.10.0...v2.11.0
[2.10.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.9.1...v2.10.0
[2.9.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.9.0...v2.9.1
[2.9.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.8.1...v2.9.0
[2.8.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.8.0...v2.8.1
[2.8.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.7.0...v2.8.0
[2.7.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.6.0...v2.7.0
[2.6.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.5.0...v2.6.0
[2.5.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.4.1...v2.5.0
[2.4.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.4.0...v2.4.1
[2.4.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.3.2...v2.4.0
[2.3.2]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.3.1...v2.3.2
[2.3.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.3.0...v2.3.1
[2.3.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.1.1...v2.2.0
[2.1.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.1.0...v2.1.1
[2.1.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.9.0...v2.0.0
[1.9.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.8.0...v1.9.0
[1.8.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.7.0...v1.8.0
[1.7.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.6.3...v1.7.0
[1.6.3]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.6.2...v1.6.3
[1.6.2]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.6.1...v1.6.2
[1.6.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.5.1...v1.6.0
[1.5.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.5.0...v1.5.1
[1.5.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.2.1...v1.3.0
[1.2.1]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.2.0...v1.2.1
[1.2.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/ManuelGil/vscode-angular-generator/compare/v0.1.0...v1.0.0
[0.1.0]: https://github.com/ManuelGil/vscode-angular-generator/releases/tag/v0.1.0
