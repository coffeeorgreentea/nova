import type { NitroApp } from "nitro/types";

export interface FeatureDefinition {
  name: string;
  folder: string;
}

interface InitRuntimeFeatureParams<T, R> {
  nitro: NitroApp;
  def: FeatureDefinition;
  getHandlers: () => T[];
  setupHandler: (nitro: NitroApp, handler: T) => Promise<R> | R;
}

/**
 * Initializes a runtime feature by setting up its handlers.
 * @param params The parameters for initializing the runtime feature.
 */
export async function initRuntimeFeature<T, R>({
  nitro,
  def,
  getHandlers,
  setupHandler,
}: InitRuntimeFeatureParams<T, R>): Promise<void> {
  const handlers = getHandlers();
  for (const handler of handlers) {
    try {
      await setupHandler(nitro, handler);
    } catch (error) {
      console.error(`Error setting up ${def.name} handler:`, error);
    }
  }
}
