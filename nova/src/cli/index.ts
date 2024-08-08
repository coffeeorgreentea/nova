import { CommandDef, defineCommand, Resolvable, SubCommandsDef } from "citty";
import { NovaCLIDefinition } from "../types";

// This file needs to be cleaned up/typed better

const nitroCommands: Resolvable<SubCommandsDef> = {
  dev: () => import("@gtc-nova/vendor").then((r) => r.dev),
  build: () => import("@gtc-nova/vendor").then((r) => r.build),
  prepare: () => import("@gtc-nova/vendor").then((r) => r.prepare),
};

export * from "citty";

export function createNovaCli(def: NovaCLIDefinition): CommandDef {
  let commands: Resolvable<SubCommandsDef> = {};

  // if its not a package, skip
  // @ts-ignore
  for (const mod of def.modules) {
    // @ts-ignore
    if ("commands" in mod) {
      // commands = { ...commands, ...mod.commands };

      for (const [key, value] of Object.entries(mod.commands)) {
        // @ts-ignore
        if ("meta" in value) {
          // @ts-ignore
          if ("name" in value.meta) {
            // @ts-ignore
            commands[value.meta.name] = value;
          }
        }
      }
    }
    // @ts-ignore
    else commands = { ...commands, ...mod };
  }
  return defineCommand({
    meta: {
      name: def.name,
      version: def.version,
      description: def.description,
    },

    subCommands: def.nitro
      ? { ...def.commands, ...nitroCommands, ...commands }
      : { ...def.commands, ...commands },
  });
}

export { defineCommand as defineNovaCommand };
