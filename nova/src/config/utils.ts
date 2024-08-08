import type { NitroConfig } from "nitro/types";
import type {
  ConfigDefiner,
  DeepPartial,
  ExtractCustomConfig,
  ExtractOmitKeys,
} from "./types";

export function createConfigDefiner<
  FrameworkName extends string,
  CustomConfig = {},
  OmitKeys extends (keyof NitroConfig)[] = []
>(
  frameworkName: FrameworkName
): ConfigDefiner<FrameworkName, CustomConfig, OmitKeys> {
  return (config) => config;
}

export function getFrameworkConfig<
  FrameworkName extends string,
  Definer extends ConfigDefiner<FrameworkName, any, any>
>(
  frameworkName: FrameworkName,
  configDefiner: Definer,
  config: ExtractCustomConfig<Definer> &
    DeepPartial<Omit<NitroConfig, ExtractOmitKeys<Definer>[number]>>
) {
  console.log(`Retrieving config for ${frameworkName}`);
  return configDefiner(config);
}
