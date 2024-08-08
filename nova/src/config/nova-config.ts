import { createConfigDefiner } from "./utils";

export interface NovaCustomConfig {
  custom: string;
  anotherCustomField?: number;
}

export const defineNovaConfig = createConfigDefiner<"Nova", NovaCustomConfig>(
  "Nova"
);
