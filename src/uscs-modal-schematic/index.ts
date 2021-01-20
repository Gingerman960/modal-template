import {
  apply,
  Rule,
  SchematicContext,
  Tree,
  url,
  template,
  mergeWith,
  move,
} from '@angular-devkit/schematics';
import {strings} from "@angular-devkit/core";
import {underscore} from "@angular-devkit/core/src/utils/strings";


export function uscsModalSchematic(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {

    const sourceTemplate = url('./files');
    const sourceParametrizedTemplate = apply(sourceTemplate, [
        template({
          ..._options,
          ...strings,
          underCase
        }),
      move(_options.path || '')
    ]);

    return mergeWith(sourceParametrizedTemplate)(tree, _context);
  };
}

function underCase(value: string): string {
  return underscore(value).toUpperCase()
}
