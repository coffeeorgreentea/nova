import { createUnimport } from "unimport";
import { createJiti } from "jiti";
import { Resolvable, SubCommandsDef } from "citty";

export async function loadCommands(
  cliDir: string
): Promise<Resolvable<SubCommandsDef>> {
  const unimport = createUnimport({});
  const files = await unimport.scanImportsFromDir([cliDir]);

  const commands: Resolvable<SubCommandsDef> = {};
  const jiti = createJiti(import.meta.url);

  for (const file of files) {
    commands[file?.as || file.name] = file.from.endsWith(".ts")
      ? await jiti.import(file.from).then((r: any) => r.default)
      : await import(file.from).then((r: any) => r.default);
  }

  return commands;
}
