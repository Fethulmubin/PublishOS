import userModel from "../models/users.js";
import postMessage from "../models/postMessage.js";
import SocialAccount from "../models/socialAccount.js";

const getProfile = async (req, res) => {
  try {
    const userId = req.params.id || req.userId;
    const user = await userModel.findById(userId).select("-password");

    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    const postCount = await postMessage.countDocuments({ posterId: userId });
    const connectedAccounts = await SocialAccount.find({ userId, isConnected: true }).select("platform profileData");

    res.status(200).json({
      success: true,
      data: {
        user,
        stats: { postCount, connectedAccounts: connectedAccounts.length },
        connectedAccounts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { name, bio, avatar, website, location } = req.body;
    const user = await userModel.findByIdAndUpdate(
      req.userId,
      { name, bio, avatar, website, location },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ success: false, message: "User not found." });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.id || req.userId;
    const posts = await postMessage.find({ posterId: userId }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { getProfile, updateProfile, getUserPosts };
