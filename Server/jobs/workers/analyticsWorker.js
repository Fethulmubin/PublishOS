const processAnalytics = async (job) => {
  const { userId, period } = job.data;
  return { success: true, userId, period };
};

const worker = {
  process: processAnalytics,
  start: () => console.log("[AnalyticsWorker] Started (placeholder)"),
  stop: () => console.log("[AnalyticsWorker] Stopped"),
};

export { processAnalytics, worker };
