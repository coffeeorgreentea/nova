import type { NovaModuleDefinition } from "./types";
import { pushPlugin, resolveModulePath } from "./module-utils";
import { Nitro } from "nitro/types";

/**
 * Initializes plugins for the Nova module.
 * @param nitro The Nitro instance.
 * @param def The Nova module definition.
 */
export async function initializePlugins<F extends Record<string, string>>(
  nitro: Nitro,
  def: NovaModuleDefinition<F>
) {
  if (!nitro.unimport) {
    nitro.logger.warn(
      "Unimport was not found. Skipping plugin initialization."
    );
    return;
  }

  const pluginsPath = resolveModulePath("runtime/plugins", def.metaUrl);
  const plugins = await nitro.unimport.scanImportsFromDir([pluginsPath]);

  for (const plugin of plugins) {
    nitro.logger.info(`Initializing ${plugin.as} plugin`);
    pushPlugin(nitro, resolveModulePath(plugin.from, def.metaUrl));
  }
}
