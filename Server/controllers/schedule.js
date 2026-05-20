import ScheduledPost from "../models/scheduledPost.js";

const getScheduledPosts = async (req, res) => {
  try {
    const posts = await ScheduledPost.find({ userId: req.userId }).sort({ scheduledAt: 1 });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createScheduledPost = async (req, res) => {
  try {
    const { content, platforms, scheduledAt, mediaUrls } = req.body;
    const post = await ScheduledPost.create({
      userId: req.userId,
      content,
      platforms,
      scheduledAt,
      mediaUrls,
      status: "scheduled",
    });

    res.status(201).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateScheduledPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await ScheduledPost.findOneAndUpdate(
      { _id: id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!post) return res.status(404).json({ success: false, message: "Scheduled post not found." });

    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteScheduledPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await ScheduledPost.findOneAndDelete({ _id: id, userId: req.userId });

    if (!post) return res.status(404).json({ success: false, message: "Scheduled post not found." });

    res.status(200).json({ success: true, message: "Scheduled post deleted." });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getScheduleStats = async (req, res) => {
  try {
    const userId = req.userId;
    const total = await ScheduledPost.countDocuments({ userId });
    const scheduled = await ScheduledPost.countDocuments({ userId, status: "scheduled" });
    const published = await ScheduledPost.countDocuments({ userId, status: "published" });
    const failed = await ScheduledPost.countDocuments({ userId, status: "failed" });
    const drafts = await ScheduledPost.countDocuments({ userId, status: "draft" });

    res.status(200).json({ success: true, data: { total, scheduled, published, failed, drafts } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getScheduledPosts, createScheduledPost, updateScheduledPost, deleteScheduledPost, getScheduleStats };
