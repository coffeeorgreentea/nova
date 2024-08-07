import { defineCommand } from 'citty';
import { consola } from 'consola';
import { listTasks } from 'nitro/core';
import { resolve } from 'pathe';

const list = defineCommand({
  meta: {
    name: "run",
    description: "List available tasks (experimental)"
  },
  args: {
    dir: {
      type: "string",
      description: "project root directory"
    }
  },
  async run({ args }) {
    const cwd = resolve(args.dir || args.cwd || ".");
    const tasks = await listTasks({ cwd, buildDir: ".nitro" });
    for (const [name, task] of Object.entries(tasks)) {
      consola.log(
        ` - \`${name}\`${task.meta?.description ? ` - ${task.meta.description}` : ""}`
      );
    }
  }
});

export { list as default };
