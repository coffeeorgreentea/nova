import { defineNovaCommand } from "@gtc-nova/kit/cli";

const echo = defineNovaCommand({
  meta: {
    name: "echo",
    description: "echoes a message",
  },
  args: {
    message: {
      type: "string",
      description: "the message to echo",
      required: true,
    },
  },
  run: (ctx) => {
    console.log(`echo: ${ctx.args.message}`);
  },
});

export default echo;
