import { defineSubscriber } from "@gtc-nova/nats/runtime/utils";

export default defineSubscriber<{ userId: string; email: string }>({
  subject: "user.notifications",
  queue: "user.notifications",
  max: 100,
  callback: ({ userId, email }) => {
    console.log(`Sending email to ${email} for user ${userId}`);
  },
});
