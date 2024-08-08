import type { Resolvable, SubCommandsDef } from "citty";

export interface NovaCLIConfig {
  name?: string;
  version?: string;
  description?: string;
  cliDir: string;
  nitro?: boolean;
  modules?: any[];
}

export interface NovaCLIDefinition extends NovaCLIConfig {
  commands: Resolvable<SubCommandsDef>;
}
