import {
  apply,
  Rule,
  SchematicContext,
  Tree,
  url,
  template,
  mergeWith,
  SchematicsException, move,
} from '@angular-devkit/schematics';
import {strings} from "@angular-devkit/core";
import {underscore} from "@angular-devkit/core/src/utils/strings";
import {buildDefaultPath} from "@schematics/angular/utility/workspace";
import {parseName} from "@schematics/angular/utility/parse-name";


export function uscsModalSchematic(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const workspaceConfigBuffer = tree.read('angular.json');
    if (!workspaceConfigBuffer) {
      throw new SchematicsException('Not an Angular CLI workspace!')
    }

    const workspaceConfig = JSON.parse(workspaceConfigBuffer.toString());
    const projectName = _options.project || workspaceConfig.defaultProject;
    const project = workspaceConfig.project[projectName];
    const defaultProjectPath = buildDefaultPath(project);
    const parsedPath = parseName(defaultProjectPath, _options.name);

    const {name, path} = parsedPath;
    const sourceTemplate = url('./files');
    const sourceParametrizedTemplate = apply(sourceTemplate, [
        template({
          ..._options,
          ...strings,
          name,
          underCase
        }),
      move(path)
    ]);

    return mergeWith(sourceParametrizedTemplate)(tree, _context);
  };
}

function underCase(value: string): string {
  return underscore(value).toUpperCase()
}
