import type {
  Nitro,
  NitroApp,
  NitroRuntimeHooks,
  NitroRuntimeConfig,
  NitroHooks,
} from "nitro/types";

export interface FeatureDefinition {
  name: string;
  folder: string;
}

export interface ScanFeatureParams {
  nitro: Nitro;
  feature: FeatureDefinition;
}

export type HookResult = void | Promise<void>;

export interface NovaHook {
  name: keyof NitroHooks;
  handler: (...args: any[]) => HookResult;
}

export interface NovaRuntimeHook {
  name: keyof NitroRuntimeHooks;
  handler: (...args: any[]) => HookResult;
}

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

export interface NovaModuleDefinition<F extends Record<string, string>> {
  name: string;
  features: F;
  featureTypeFunctions: Record<keyof F, FeatureTypeFunction>;
  pluginsDir?: string;
  utilsDir?: string;
  metaUrl: string;
  setup?: (nitro: Nitro) => Promise<void> | void;
  hooks: NovaHook[];
}

export interface NovaFeatures {}
