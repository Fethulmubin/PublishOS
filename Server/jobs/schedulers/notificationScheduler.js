import Notification from "../../models/notification.js";

const createNotificationJob = async ({ userId, type, title, message, link }) => {
  const notification = await Notification.create({ userId, type, title, message, link });
  return { jobId: notification._id, status: "scheduled" };
};

const scheduleDigest = async ({ userId, frequency }) => {
  return { userId, frequency, status: "scheduled" };
};

export { createNotificationJob, scheduleDigest };
