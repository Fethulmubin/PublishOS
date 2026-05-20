const processNotification = async (job) => {
  const { userId, type, title, message } = job.data;
  return { success: true, userId, type };
};

const worker = {
  process: processNotification,
  start: () => console.log("[NotificationWorker] Started (placeholder)"),
  stop: () => console.log("[NotificationWorker] Stopped"),
};

export { processNotification, worker };
