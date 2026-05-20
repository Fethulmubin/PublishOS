import CreatorAnalytics from "../models/creatorAnalytics.js";
import postMessage from "../models/postMessage.js";

const getEngagement = async (req, res) => {
  try {
    const userId = req.userId;
    const analytics = await CreatorAnalytics.find({ userId }).sort({ date: -1 }).limit(30);

    res.status(200).json({ success: true, data: analytics });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getCreatorInsights = async (req, res) => {
  try {
    const userId = req.userId;
    const posts = await postMessage.find({ posterId: userId });
    const totalPosts = posts.length;
    const totalLikes = posts.reduce((sum, p) => sum + p.likes.length, 0);
    const totalComments = posts.reduce((sum, p) => sum + (p.comments ? p.comments.length : 0), 0);

    res.status(200).json({
      success: true,
      data: {
        totalPosts,
        totalLikes,
        totalComments,
        averageLikes: totalPosts ? Math.round(totalLikes / totalPosts) : 0,
        averageComments: totalPosts ? Math.round(totalComments / totalPosts) : 0,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getContentPerformance = async (req, res) => {
  try {
    const posts = await postMessage.find({ posterId: req.userId })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("title likes comments createdAt");

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAnalyticsOverview = async (req, res) => {
  try {
    const userId = req.userId;
    const posts = await postMessage.find({ posterId: userId });
    const totalPosts = posts.length;

    res.status(200).json({
      success: true,
      data: {
        totalPosts,
        totalEngagement: posts.reduce((sum, p) => sum + p.likes.length + (p.comments ? p.comments.length : 0), 0),
        periodStart: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        periodEnd: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getEngagementBreakdown = async (req, res) => {
  try {
    const posts = await postMessage.find({ posterId: req.userId });

    const breakdown = {
      likes: posts.reduce((sum, p) => sum + p.likes.length, 0),
      comments: posts.reduce((sum, p) => sum + (p.comments ? p.comments.length : 0), 0),
    };

    res.status(200).json({ success: true, data: breakdown });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getEngagement, getCreatorInsights, getContentPerformance, getAnalyticsOverview, getEngagementBreakdown };
