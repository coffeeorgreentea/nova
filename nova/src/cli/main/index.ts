#!/usr/bin/env node
import { loadConfig } from "c12";
import { Resolvable, runMain, SubCommandsDef } from "citty";
import { createNovaCli } from "../";
import { createUnimport } from "unimport";
import { createJiti } from "jiti";
import type { NovaCLIConfig } from "../../types";

const main = async () => {
  const { config } = await loadConfig<NovaCLIConfig>({
    configFile: "cli.config",
  });

  const unimport = createUnimport({});
  const files = await unimport.scanImportsFromDir([config.cliDir]);

  // Commands from end user cli folder
  let commands: Resolvable<SubCommandsDef> = {};
  const jiti = createJiti(import.meta.url);

  for (const file of files) {
    // Just-in-time compile the file if its typescript, otherwise just import it
    commands[file?.as || file.name] = file.from.endsWith(".ts")
      ? await jiti.import(file.from).then((r: any) => r.default)
      : await import(file.from).then((r: any) => r.default);
  }

  const cli = createNovaCli({
    name: config.name || "nova",
    version: config.version || "0.0.0",
    description: config.description || "A CLI tool",
    nitro: config.nitro,
    modules: config.modules as any[],
    commands,
  });

  runMain(cli);
};

main();
