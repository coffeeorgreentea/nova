import type { NitroConfig } from "nitro/config";

type DeepPartial<T> = T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

type ConfigDefiner<
  FrameworkName extends string,
  CustomConfig = {},
  OmitKeys extends (keyof NitroConfig)[] = []
> = (
  config: DeepPartial<Omit<NitroConfig, OmitKeys[number]>> & CustomConfig
) => DeepPartial<Omit<NitroConfig, OmitKeys[number]>> & CustomConfig;

type ExtractCustomConfig<T> = T extends ConfigDefiner<any, infer C, any>
  ? C
  : never;

type ExtractOmitKeys<T> = T extends ConfigDefiner<any, any, infer O>
  ? O
  : never;

export type {
  DeepPartial,
  ConfigDefiner,
  ExtractCustomConfig,
  ExtractOmitKeys,
};
