import { CommandDef, defineCommand } from "citty";
import { NovaCLIDefinition } from "./types";
import { nitroCommands } from "./commands/nitro";
import { createFrameworkCli } from "./utils/framework";

export function createNovaCli(def: NovaCLIDefinition): CommandDef {
  return createFrameworkCli({
    name: def.name || "nova",
    version: def.version || "0.0.0",
    description: def.description || "Nova CLI",
    commands: def.commands as any, // TODO: Fix types
    nitroCommands: def.nitro ? nitroCommands : {},
    modules: def.modules || [],
  });
}

export { defineCommand as defineNovaCommand };
