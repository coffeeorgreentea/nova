import { defu } from "defu";

export function deepMerge<T>(...objects: Partial<T>[]): T {
  return defu({}, ...objects) as T;
}
