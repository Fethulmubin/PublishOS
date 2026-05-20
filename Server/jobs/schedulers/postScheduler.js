import ScheduledPost from "../../models/scheduledPost.js";

const checkDuePosts = async () => {
  const duePosts = await ScheduledPost.find({
    status: "scheduled",
    scheduledAt: { $lte: new Date() },
  }).populate("userId");

  return duePosts;
};

const schedulePost = async ({ postId, scheduledAt }) => {
  return { postId, scheduledAt, status: "scheduled" };
};

const cancelScheduledPost = async (postId) => {
  await ScheduledPost.findByIdAndUpdate(postId, { status: "draft" });
  return { postId, status: "cancelled" };
};

export { checkDuePosts, schedulePost, cancelScheduledPost };
