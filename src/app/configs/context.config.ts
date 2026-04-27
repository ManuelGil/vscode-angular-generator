/**
 * Context key identifiers for the Angular VSCode extension.
 * These keys are used with setContext to control UI visibility and behavior.
 */
export enum ContextKeys {
  ActivateItemTerminalComponent = 'activateItem.terminal.component',
  ActivateItemTerminalGuard = 'activateItem.terminal.guard',
  ActivateItemTerminalPipe = 'activateItem.terminal.pipe',
  ActivateItemTerminalService = 'activateItem.terminal.service',
  ActivateItemTerminalCustom = 'activateItem.terminal.custom',
  ActivateItemFileClass = 'activateItem.file.class',
  ActivateItemFileComponent = 'activateItem.file.component',
  ActivateItemFileDirective = 'activateItem.file.directive',
  ActivateItemFileEnum = 'activateItem.file.enum',
  ActivateItemFileGuard = 'activateItem.file.guard',
  ActivateItemFileInterceptor = 'activateItem.file.interceptor',
  ActivateItemFileInterface = 'activateItem.file.interface',
  ActivateItemFileModule = 'activateItem.file.module',
  ActivateItemFilePipe = 'activateItem.file.pipe',
  ActivateItemFileResolver = 'activateItem.file.resolver',
  ActivateItemFileService = 'activateItem.file.service',
  ActivateItemFileSpec = 'activateItem.file.spec',
  ActivateItemFileTemplate = 'activateItem.file.template',
}

/** Keys used with {@link ExtensionContext.globalState} to persist data across sessions. */
export enum GlobalStateKeys {
  Version = 'version',
  WorkspaceFolder = 'selectedWorkspaceFolder',
}
