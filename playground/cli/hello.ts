import { defineNovaCommand } from "@gtc-nova/kit/cli";

export default defineNovaCommand({
  meta: {
    name: "hello",
    description: "Say hello",
  },
  args: {
    name: {
      type: "string",
      description: "Name to greet",
      required: true,
    },
  },
  run: (ctx) => {
    console.log(`Hello, ${ctx.args.name}!`);
  },
});
