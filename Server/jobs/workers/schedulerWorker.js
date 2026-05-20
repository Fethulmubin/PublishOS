const processScheduledPost = async (job) => {
  const { postId, userId, platforms, content } = job.data;
  return { success: true, postId, publishedTo: platforms };
};

const worker = {
  process: processScheduledPost,
  start: () => console.log("[SchedulerWorker] Started (placeholder)"),
  stop: () => console.log("[SchedulerWorker] Stopped"),
};

export { processScheduledPost, worker };
