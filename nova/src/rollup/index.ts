import { virtual } from "../vendor/virtual";
import { fileURLToPath } from "node:url";
import type { Nitro } from "nitro/types";
import { capitalize, getImportId } from "../utils";

export const runtimeDir = fileURLToPath(
  new URL("dist/runtime/", import.meta.url)
);

interface HandlerDefinition {
  type: string;
  handler: string;
  route?: string;
  options?: any;
  lazy?: boolean;
}

/**
 * Creates a Rollup plugin for the Nova module.
 * @param moduleName The name of the module.
 * @param features The features to include in the plugin.
 * @returns A function that creates the Rollup plugin.
 */
export function createRollupPlugin(moduleName: string, features: string[]) {
  return function (nitro: Nitro) {
    const getHandlers = (): HandlerDefinition[] => {
      return features.flatMap((feature) => {
        const key = `scanned${capitalize(feature)}`;
        const scannedHandlers = (nitro as any)[key] || [];
        return scannedHandlers.map((h: any) => ({ ...h, type: feature }));
      });
    };

    const cleanHandler = (handler: HandlerDefinition) => ({
      type: handler.type,
      handler: getImportId(handler.handler, handler.lazy),
      lazy: !!handler.lazy,
      route: handler.route || null,
      options: handler.options || null,
    });

    const generateHandlerCode = (
      handlers: HandlerDefinition[],
      type: string
    ): string => {
      const typeHandlers = handlers.filter((h) => h.type === type);
      const imports = typeHandlers.filter((h) => !h.lazy).map((h) => h.handler);
      const lazyImports = typeHandlers
        .filter((h) => h.lazy)
        .map((h) => h.handler);

      return `
${imports
  .map((handler) => `import ${getImportId(handler)} from '${handler}';`)
  .join("\n")}
${lazyImports
  .map(
    (handler) =>
      `const ${getImportId(handler, true)} = () => import('${handler}');`
  )
  .join("\n")}
export const handlers = [
${typeHandlers
  .map((h) => {
    const handlerId = getImportId(h.handler, h.lazy);
    return `{type: ${JSON.stringify(h.type)}, handler: ${handlerId}, lazy: ${
      h.lazy
    }, route: ${JSON.stringify(h.route)}, options: ${JSON.stringify(
      h.options
    )}}`;
  })
  .join(",\n")}
];
`.trim();
    };

    const virtualFiles: Record<string, () => string> = {};
    for (const feature of features) {
      virtualFiles[`#${moduleName}-virtual/${feature}`] = () =>
        generateHandlerCode(getHandlers(), feature);
    }

    return virtual(virtualFiles, nitro.vfs);
  };
}
