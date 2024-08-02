import type { NitroApp, NitroRuntimeConfig } from "nitro/types";

export type VirtualFeatureHandler<V> = () => Promise<{
  default: V;
}>;

export type BaseVirtualHandler = {
  type: string;
  handler: VirtualFeatureHandler<any>;
  lazy?: boolean;
};

type InitFeatureHandlers = (
  nitro: NitroApp,
  handlers: BaseVirtualHandler[]
) => Promise<void> | void;

export interface NovaRuntimeDefinition<
  Config extends Record<string, string>,
  T = any,
  InitializeReturn = any,
  BeforeReturn = any,
  AfterReturn = any
> {
  useRuntimeConfig: () => any;
  initialize: (nitro: NitroApp, config: NitroRuntimeConfig) => InitializeReturn;
  before: (nitro: NitroApp, initialize: InitializeReturn) => BeforeReturn;
  after: (nitro: NitroApp, before: BeforeReturn) => AfterReturn;
  runtimeSetup?: Record<
    keyof Config,
    {
      initFeatureHandlers: InitFeatureHandlers;
      getVirtualHandlers: () => BaseVirtualHandler[];
    }
  >;
}
