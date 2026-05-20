const MAX_RETRIES = 3;
const RETRY_DELAYS = [60000, 300000, 900000];

const scheduleRetry = async ({ jobId, attempt, jobData }) => {
  if (attempt >= MAX_RETRIES) return { status: "failed", jobId };

  const delay = RETRY_DELAYS[attempt] || RETRY_DELAYS[RETRY_DELAYS.length - 1];
  return { status: "scheduled", jobId, retryAt: new Date(Date.now() + delay), attempt: attempt + 1 };
};

const shouldRetry = (attempt) => attempt < MAX_RETRIES;

export { scheduleRetry, shouldRetry, MAX_RETRIES, RETRY_DELAYS };
