import type { Resolvable, SubCommandsDef } from "citty";
import type {
  Nitro,
  NitroRuntimeHooks,
  NitroHooks,
  NitroConfig,
} from "nitro/types";
import { NovaTypeImport } from "./utils/type-extension";

export interface FeatureDefinition {
  name: string;
  folder: string;
}

export interface ScanFeatureParams {
  nitro: Nitro;
  feature: FeatureDefinition;
}

export type HookResult = void | Promise<void>;

export interface NovaPlugin {
  name: string;
  setup: (nitro: Nitro) => Promise<void> | void;
}

export interface FeatureConfig {
  name: string;
  folder: string;
}

export interface VirtualFeatureDefinition<T> {
  name: string;
  handlers: T[];
}

export type ScannedFeatureHandler<S> = {
  default: S;
};

export type FeatureVirtualSetup<V> = (
  nitro: Nitro,
  handler: V
) => Promise<void> | void;

export interface NovaFeatureDefinition<Config extends FeatureConfig[]> {
  name: string;
  folder: string;
}

type FeatureTypeFunction = (
  handler: ScannedFeatureHandler<any>
) => Promise<void> | void;

export interface NovaCLIDefinition {
  name: string;
  version: string;
  description: string;
  commands: Resolvable<SubCommandsDef>;
  nitro?: boolean;
  modules: any[];
}

export interface NovaCLIConfig {
  name: string;
  version: string;
  description: string;
  nitro?: boolean;
  cliDir: string;
  modules: NitroConfig["modules"];
}

export interface GeneratedHookTypes {
  runtimeBeforeReturn?: Record<string, string>;
  runtimeAfterReturn?: Record<string, string>;
  runtimeBeforePayload?: Record<string, string>;
  runtimeAfterPayload?: Record<string, string>;
}

export interface NovaModuleDefinition<F extends Record<string, string>> {
  name: string;
  features: F;
  typeExtension: {
    hookTypes?: GeneratedHookTypes;
    imports: NovaTypeImport[];
  };

  pluginsDir?: string;
  utilsDir?: string;
  metaUrl: string;
  setup?: (nitro: Nitro) => Promise<void> | void;
}

export interface NovaFeatures {}
