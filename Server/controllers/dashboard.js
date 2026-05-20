import ScheduledPost from "../models/scheduledPost.js";
import CreatorAnalytics from "../models/creatorAnalytics.js";
import Notification from "../models/notification.js";

const getOverview = async (req, res) => {
  try {
    const userId = req.userId;

    const totalScheduled = await ScheduledPost.countDocuments({ userId, status: "scheduled" });
    const totalPublished = await ScheduledPost.countDocuments({ userId, status: "published" });
    const unreadNotifications = await Notification.countDocuments({ userId, isRead: false });
    const recentAnalytics = await CreatorAnalytics.findOne({ userId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: {
        totalScheduled,
        totalPublished,
        unreadNotifications,
        recentEngagement: recentAnalytics?.metrics?.engagementRate || 0,
        totalPosts: recentAnalytics?.metrics?.totalPosts || 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const userId = req.userId;

    const analytics = await CreatorAnalytics.find({ userId }).sort({ date: -1 }).limit(30);

    res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getQuickActions = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: [
        { id: "create-post", label: "Create Post", icon: "add_circle", route: "/feed" },
        { id: "ai-studio", label: "AI Studio", icon: "auto_awesome", route: "/ai-studio" },
        { id: "schedule", label: "Schedule Post", icon: "calendar_today", route: "/schedule" },
        { id: "analytics", label: "View Analytics", icon: "bar_chart", route: "/analytics" },
      ],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getOverview, getStats, getQuickActions };
