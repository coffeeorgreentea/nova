import type { NitroApp, NitroRuntimeConfig } from "nitro/types";

export type VirtualFeatureHandler<V> = () => Promise<{
  default: V;
}>;

export type BaseVirtualHandler<V> = {
  type: string;
  handler: VirtualFeatureHandler<V>;
  lazy?: boolean;
  route?: string;
};

type InitFeatureHandlers<T> = (
  nitro: NitroApp,
  handlers: BaseVirtualHandler<T>[]
) => Promise<void> | void;

export interface NovaRuntimeDefinition<
  Config extends Record<string, string>,
  T extends Record<keyof Config, any>,
  InitializeReturn = any,
  BeforeReturn = any,
  AfterReturn = any
> {
  useRuntimeConfig: () => any;
  initialize: (nitro: NitroApp, config: NitroRuntimeConfig) => InitializeReturn;
  before: (nitro: NitroApp, initialize: InitializeReturn) => BeforeReturn;
  after: (nitro: NitroApp, before: BeforeReturn) => AfterReturn;
  runtimeSetup?: {
    [K in keyof Config]: {
      initFeatureHandlers: InitFeatureHandlers<T[K]>;
      getVirtualHandlers: () => BaseVirtualHandler<T[K]>[];
    };
  };
}
