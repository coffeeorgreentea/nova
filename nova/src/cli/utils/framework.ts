import { CommandDef, CommandContext } from "citty";
import { createNitro } from "nitro/core";
import type { NitroConfig } from "nitro/types";
import consola from "consola";
import { deepMerge } from "./merge";

export type NitroConfigOverrides = Partial<NitroConfig>;

export function withFrameworkConfig(
  originalCommand: CommandDef,
  configOverrides: NitroConfigOverrides = {}
): CommandDef {
  return {
    ...originalCommand,
    async run(context: CommandContext<any>) {
      const originalRun = originalCommand.run;
      if (typeof originalRun !== "function") {
        throw new Error("Original command run method is not a function");
      }

      const wrappedCreateNitro: typeof createNitro = async (
        config?: Parameters<typeof createNitro>[0],
        opts?: Parameters<typeof createNitro>[1]
      ): ReturnType<typeof createNitro> => {
        const finalConfig: NitroConfig = deepMerge(
          config || {},
          configOverrides
        );

        const meta = context?.cmd.meta as { name: string };

        if (meta.name === "dev") {
          finalConfig.dev = true;
          finalConfig.preset = finalConfig.preset || "nitro-dev";
        } else if (meta.name === "build") {
          finalConfig.dev = false;
        }

        if (!opts) {
          consola.warn("No options provided to createNitro");
          return await createNitro(finalConfig);
        }
        return await createNitro(finalConfig, opts);
      };

      const newContext: CommandContext & {
        $createNitro: typeof wrappedCreateNitro;
      } = {
        ...context,
        $createNitro: wrappedCreateNitro,
      };

      return originalRun(newContext);
    },
  };
}

export function createFrameworkCli(def: {
  name: string;
  version: string;
  description: string;
  commands: Record<string, CommandDef>;
  nitroCommands: Record<string, () => Promise<CommandDef>>;
  modules: any[];
}): CommandDef {
  const commands: Record<string, CommandDef> = { ...def.commands };

  for (const mod of def.modules) {
    if (typeof mod === "object" && "commands" in mod) {
      for (const [key, value] of Object.entries(mod.commands)) {
        if (
          typeof value === "object" &&
          // @ts-ignore
          "meta" in value &&
          typeof value.meta === "object" &&
          // @ts-ignore
          "name" in value.meta
        ) {
          commands[value.meta.name as string] = value as CommandDef;
        }
      }
    } else if (typeof mod === "object") {
      Object.assign(commands, mod);
    }
  }

  return {
    meta: {
      name: def.name,
      version: def.version,
      description: def.description,
    },
    subCommands: { ...commands, ...def.nitroCommands },
  };
}
