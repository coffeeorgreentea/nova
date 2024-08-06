import { definePublisher } from "@gtc-nova/nats/runtime/utils";

export default definePublisher<{ userId: string; email: string }>({
  subject: "user.registered",
  options: {
    reply: "user.registered.reply",
  },
});
