import type { NovaRuntimeDefinition } from "./types";
import { consola } from "consola";
import type {
  NitroAppPlugin,
  NitroHooks,
  NitroRuntimeHooks,
} from "nitro/types";

export function defineNitroPlugin(def: NitroAppPlugin) {
  return def;
}

type HookKeys<T> = keyof T;

type Awaitable<T> = T | Promise<T>;

/**
 * Defines a Nova plugin for the Nitro runtime.
 * @param {NovaRuntimeDefinition<Config, T, InitializeReturn, BeforeReturn, AfterReturn>} options - Plugin configuration
 * @returns {ReturnType<typeof defineNitroPlugin>} Configured Nitro plugin
 */
export function defineNovaPlugin<
  Config extends Record<string, string>,
  T extends Record<keyof Config, any>,
  IR extends Awaitable<Record<string, any>> = any,
  BeforeReturn extends Awaitable<Record<string, any>> = any,
  AfterReturn extends Awaitable<Record<string, any>> = any
>({
  moduleName,
  useRuntimeConfig,
  initialize,
  // before,
  // after,
  runtimeSetup,
}: NovaRuntimeDefinition<Config, T, IR, BeforeReturn, AfterReturn>) {
  return defineNitroPlugin(async (nitro) => {
    const config = useRuntimeConfig();

    const beforeHook: HookKeys<NitroRuntimeHooks> =
      `nova:${moduleName}:before` as any;
    const afterHook: HookKeys<NitroRuntimeHooks> =
      `nova:${moduleName}:after` as any;

    try {
      const initResult = await initialize(nitro, config);
      // const beforeResult = await before(nitro, initResult);
      // await nitro.hooks.callHook(
      //   // `nova:${moduleName}:before` as any as HookKeys<NitroHooks>,
      //   beforeHook,
      //   initResult
      // );

      // await initializeFeatures(runtimeSetup, nitro);

      // // await after(nitro, beforeResult);

      // await nitro.hooks.callHook(
      //   // `nova:${moduleName}:after` as any as HookKeys<NitroHooks>,
      //   afterHook,
      //   initResult
      // );
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
async function initializeFeatures<
  Config extends Record<string, string>,
  T extends Record<keyof Config, any>,
  InitializeReturn extends Awaitable<Record<string, any>> = any,
  BeforeReturn extends Awaitable<Record<string, any>> = any,
  AfterReturn extends Awaitable<Record<string, any>> = any
>(
  runtimeSetup: NovaRuntimeDefinition<
    Config,
    T,
    InitializeReturn,
    BeforeReturn,
    AfterReturn
  >["runtimeSetup"],
  nitro: any
) {
  if (!runtimeSetup) return;

  for (const featureConfig of Object.values(runtimeSetup)) {
    const handlers = featureConfig.getVirtualHandlers();
    await featureConfig.initFeatureHandlers(nitro, handlers);
  }
}
