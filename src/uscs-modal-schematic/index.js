"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uscsModalSchematic = void 0;
const schematics_1 = require("@angular-devkit/schematics");
const core_1 = require("@angular-devkit/core");
const strings_1 = require("@angular-devkit/core/src/utils/strings");
function uscsModalSchematic(_options) {
    return (tree, _context) => {
        const sourceTemplate = schematics_1.url('./files');
        const sourceParametrizedTemplate = schematics_1.apply(sourceTemplate, [
            schematics_1.template(Object.assign(Object.assign(Object.assign({}, _options), core_1.strings), { underCase })),
            schematics_1.move(_options.path || '')
        ]);
        return schematics_1.mergeWith(sourceParametrizedTemplate)(tree, _context);
    };
}
exports.uscsModalSchematic = uscsModalSchematic;
function underCase(value) {
    return strings_1.underscore(value).toUpperCase();
}
//# sourceMappingURL=index.js.map