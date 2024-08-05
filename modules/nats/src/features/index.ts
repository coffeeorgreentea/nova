export const natsFeatures = {
  subscriptions: "nats/subscriptions",
  publishers: "nats/publishers",
  // consumers: "nats/jetstream/consumers",
  // streams: "nats/jetstream/streams",
  // queues: "nats/queues",
  // workers: "nats/workers",
  // requests: "nats/requests",
  // replies: "nats/replies",
} as const;

export type NatsFeatures = typeof natsFeatures;
