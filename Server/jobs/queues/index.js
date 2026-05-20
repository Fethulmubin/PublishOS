const QUEUE_NAMES = {
  SCHEDULED_POSTS: "scheduled-posts",
  NOTIFICATIONS: "notifications",
  ANALYTICS: "analytics",
  AI_PROCESSING: "ai-processing",
  PUBLISHING: "publishing",
};

const queues = {};

const createQueue = (name) => {
  queues[name] = { name, jobs: [] };
  return queues[name];
};

const getQueue = (name) => {
  if (!queues[name]) createQueue(name);
  return queues[name];
};

export { QUEUE_NAMES, createQueue, getQueue };
