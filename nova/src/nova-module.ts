import type { NovaModuleDefinition } from "./types";
import { defineNitroModule } from "nitro/kit";
import { createRollupPlugin } from "./rollup";
import { scan } from "./utils";
import { initializePlugins } from "./plugins";
import { writeNovaTypes } from "./utils/type-extension";

/**
 * Defines a Nova module for the Nitro backend framework.
 *
 * This function creates a Nitro module with Nova-specific functionality,
 * including feature scanning, Rollup plugin integration, and plugin initialization.
 * @example
 * const myNovaModule = defineNovaModule({
 *   name: 'my-nova-module',
 *   features: {
 *     // name: folderpath
 *     api: 'api',
 *     routes: 'routes'
 *   },
 *   pluginsDir: 'plugins',
 *   metaUrl: import.meta.url
 * });
 */
export function defineNovaModule<F extends Record<string, string>>(
  def: NovaModuleDefinition<F>
) {
  return defineNitroModule({
    name: def.name,
    setup: async (nitro) => {
      // Scan and initialize features
      for (const [featureName, featureFolder] of Object.entries(def.features)) {
        const scannedFeatures = await scan({
          nitro,
          feature: { name: featureName, folder: featureFolder },
        });
        Object.assign(nitro, scannedFeatures);
      }

      // Add Rollup plugin
      nitro.hooks.hook("rollup:before", async (nit, config) => {
        // @ts-ignore
        config.plugins.push(
          createRollupPlugin(def.name, Object.keys(def.features))(nitro)
        );
      });

      nitro.options.typescript.generateRuntimeConfigTypes = true;

      // Write feature types
      nitro.hooks.hook("types:extend", async () => {
        await writeNovaTypes(nitro, def.name, def.features, def.typeExtension);
      });

      // Initialize plugins
      if (def.pluginsDir) {
        await initializePlugins(nitro, def);
      }

      // Call custom setup function if provided
      if (def.setup) {
        await def.setup(nitro);
      }
    },
  });
}
export type * from "./types";
