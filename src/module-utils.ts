import type { Nitro } from "nitro/types";
import { fileURLToPath } from "node:url";
import { scanServerRoutes } from "./vendor/scan";
import type { ScanFeatureParams } from "./types";
import { hash } from "ohash";

/**
 * Generates an import ID for a given path.
 * @param p The path to generate an ID for.
 * @param lazy Whether the import is lazy or not.
 * @returns The generated import ID.
 */
export function getImportId(p: string, lazy?: boolean): string {
  return (lazy ? "_lazy_" : "_") + hash(p).slice(0, 6);
}

/**
 * Capitalizes the first letter of a string.
 * @param str The string to capitalize.
 * @returns The capitalized string.
 */
export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Pushes a plugin to the Nitro instance.
 * @param nitro The Nitro instance.
 * @param pluginPath The path to the plugin.
 */
export function pushPlugin(nitro: Nitro, pluginPath: string): void {
  nitro.options.plugins.push(pluginPath);
}

/**
 * Resolves a module path relative to the module's meta URL.
 * @param path The path to resolve.
 * @param metaUrl The module's meta URL.
 * @returns The resolved path.
 */
export function resolveModulePath(path: string, metaUrl: string): string {
  return fileURLToPath(new URL(path, metaUrl));
}

/**
 * Scans for features in the specified folder.
 * @param params The scan parameters.
 * @returns An object containing the scanned features.
 */
export async function scan({ nitro, feature }: ScanFeatureParams) {
  const scannedFeatureName = `scanned${capitalize(feature.name)}`;
  return {
    [scannedFeatureName]: await scanServerRoutes(nitro, feature.folder),
  };
}
