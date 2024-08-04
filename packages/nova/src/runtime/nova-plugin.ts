import type { NovaRuntimeDefinition } from "./types";
import { consola } from "consola";
import type { NitroAppPlugin } from "nitro/types";

export function defineNitroPlugin(def: NitroAppPlugin) {
  return def;
}

type Awaitable<T> = T | Promise<T>;

/**
 * Defines a Nova plugin for the Nitro runtime.
 * @param {NovaRuntimeDefinition<Config, T, InitializeReturn, BeforeReturn, AfterReturn>} options - Plugin configuration
 * @returns {ReturnType<typeof defineNitroPlugin>} Configured Nitro plugin
 */
export function defineNovaPlugin<
  Config extends Record<string, string>,
  T = any,
  InitializeReturn extends Awaitable<Record<string, any>> = any,
  BeforeReturn extends Awaitable<Record<string, any>> = any,
  AfterReturn extends Awaitable<Record<string, any>> = any
>({
  useRuntimeConfig,
  initialize,
  before,
  after,
  runtimeSetup,
}: NovaRuntimeDefinition<
  Config,
  T,
  InitializeReturn,
  BeforeReturn,
  AfterReturn
>) {
  return defineNitroPlugin(async (nitro) => {
    const config = useRuntimeConfig();

    try {
      const initResult = await initialize(nitro, config);
      const beforeResult = await before(nitro, initResult);

      await initializeFeatures(runtimeSetup, nitro);

      await after(nitro, beforeResult);
      consola.success("Nova plugin initialized.");
    } catch (error) {
      consola.error("Failed to initialize Nova plugin:", error);
      throw error;
    }
  });
}

/**
 * Initializes features based on the runtime setup.
 *
 * @param runtimeSetup - The runtime setup configuration
 * @param nitro - The Nitro instance
 */
async function initializeFeatures(
  runtimeSetup: NovaRuntimeDefinition<any, any, any, any, any>["runtimeSetup"],
  nitro: any
) {
  if (!runtimeSetup) return;

  for (const featureConfig of Object.values(runtimeSetup)) {
    const handlers = featureConfig.getVirtualHandlers();
    await featureConfig.initFeatureHandlers(nitro, handlers);
  }
}
