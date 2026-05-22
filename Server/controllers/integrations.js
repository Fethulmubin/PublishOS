import SocialAccount from "../models/socialAccount.js";
import * as linkedinService from "../services/integrations/linkedin/index.js";
import * as youtubeService from "../services/integrations/youtube/index.js";

const getConnectedAccounts = async (req, res) => {
  try {
    const accounts = await SocialAccount.find({ userId: req.userId });
    res.status(200).json({ success: true, data: accounts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const connectLinkedIn = async (req, res) => {
  try {
    const { accessToken, profileData } = req.body;
    const account = await SocialAccount.findOneAndUpdate(
      { userId: req.userId, platform: "linkedin" },
      { accessToken, profileData, isConnected: true },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const connectYouTube = async (req, res) => {
  try {
    const { accessToken, refreshToken, profileData } = req.body;
    const account = await SocialAccount.findOneAndUpdate(
      { userId: req.userId, platform: "youtube" },
      { accessToken, refreshToken, profileData, isConnected: true },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const connectTwitter = async (req, res) => {
  try {
    const { accessToken, profileData } = req.body;
    const account = await SocialAccount.findOneAndUpdate(
      { userId: req.userId, platform: "twitter" },
      { accessToken, profileData, isConnected: true },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const connectInstagram = async (req, res) => {
  try {
    const { accessToken, profileData } = req.body;
    const account = await SocialAccount.findOneAndUpdate(
      { userId: req.userId, platform: "instagram" },
      { accessToken, profileData, isConnected: true },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const connectFacebook = async (req, res) => {
  try {
    const { accessToken, profileData } = req.body;
    const account = await SocialAccount.findOneAndUpdate(
      { userId: req.userId, platform: "facebook" },
      { accessToken, profileData, isConnected: true },
      { upsert: true, new: true }
    );
    res.status(200).json({ success: true, data: account });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const disconnectAccount = async (req, res) => {
  try {
    const { platform } = req.params;
    const account = await SocialAccount.findOneAndUpdate(
      { userId: req.userId, platform },
      { isConnected: false, accessToken: null, refreshToken: null },
      { new: true }
    );
    if (!account) return res.status(404).json({ success: false, message: "Account not found." });
    res.status(200).json({ success: true, message: `${platform} account disconnected.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getAuthUrl = async (req, res) => {
  try {
    const { platform } = req.params;
    if (platform === "linkedin") {
      const url = linkedinService.getAuthUrl(
        process.env.LINKEDIN_CLIENT_ID,
        process.env.LINKEDIN_REDIRECT_URI,
        req.userId
      );
      return res.status(200).json({ success: true, data: { url } });
    }
    if (platform === "youtube") {
      const url = youtubeService.getAuthUrl(
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUTUBE_REDIRECT_URI,
        req.userId
      );
      return res.status(200).json({ success: true, data: { url } });
    }
    res.status(200).json({
      success: true,
      data: { url: `[${platform} OAuth URL placeholder]` },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const handleOAuthCallback = async (req, res) => {
  try {
    const { platform } = req.params;
    const { code, state } = req.query;
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';

    if (platform === "linkedin") {
      if (!code) {
        return res.redirect(`${frontendUrl}/settings?linkedin=error`);
      }

      const tokenData = await linkedinService.exchangeCodeForToken(
        code,
        process.env.LINKEDIN_CLIENT_ID,
        process.env.LINKEDIN_CLIENT_SECRET,
        process.env.LINKEDIN_REDIRECT_URI
      );

      const profile = await linkedinService.getProfile(tokenData.accessToken);

      const profileData = {
        name: profile.name,
        avatar: profile.avatar,
        username: profile.username,
      };

      await SocialAccount.findOneAndUpdate(
        { userId: state, platform: "linkedin" },
        {
          userId: state,
          platform: "linkedin",
          platformUserId: profile.linkedinId,
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          tokenExpiresAt: new Date(Date.now() + tokenData.expiresIn * 1000),
          profileData,
          isConnected: true,
        },
        { upsert: true, new: true }
      );

      return res.redirect(`${frontendUrl}/settings?linkedin=connected`);
    }

    if (platform === "youtube" || platform === "google") {
      if (!code) {
        return res.redirect(`${frontendUrl}/settings?youtube=error`);
      }

      const tokenData = await youtubeService.exchangeCodeForToken(
        code,
        process.env.YOUTUBE_CLIENT_ID,
        process.env.YOUTUBE_CLIENT_SECRET,
        process.env.YOUTUBE_REDIRECT_URI
      );

      const channel = await youtubeService.getChannelInfo(tokenData.accessToken);

      const profileData = {
        name: channel.name,
        avatar: channel.avatar,
        username: channel.channelId,
      };

      await SocialAccount.findOneAndUpdate(
        { userId: state, platform: "youtube" },
        {
          userId: state,
          platform: "youtube",
          platformUserId: channel.channelId,
          accessToken: tokenData.accessToken,
          refreshToken: tokenData.refreshToken,
          tokenExpiresAt: new Date(Date.now() + tokenData.expiresIn * 1000),
          profileData,
          isConnected: true,
        },
        { upsert: true, new: true }
      );

      return res.redirect(`${frontendUrl}/settings?youtube=connected`);
    }

    res.redirect(`${frontendUrl}/settings`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const param = req.params.platform === "youtube" || req.params.platform === "google" ? "youtube" : "linkedin";
    res.redirect(`${frontendUrl}/settings?${param}=error`);
  }
};

const publishToLinkedIn = async (req, res) => {
  try {
    const userId = req.userId;
    const { content, media } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Content is required." });
    }

    const account = await SocialAccount.findOne({ userId, platform: "linkedin", isConnected: true });
    if (!account) {
      return res.status(404).json({ success: false, message: "LinkedIn account not connected. Please connect your LinkedIn account first." });
    }

    const result = await linkedinService.publishPost({
      accessToken: account.accessToken,
      content: content.trim(),
      media,
    });

    res.status(200).json({
      success: true,
      data: { postId: result.platformPostId },
      message: "Post published to LinkedIn successfully.",
    });
  } catch (error) {
    console.error("LinkedIn publish error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const publishToYouTube = async (req, res) => {
  try {
    const userId = req.userId;
    const { title, description, tags, categoryId, privacyStatus, videoBase64, mimeType } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: "Video title is required." });
    }
    if (!videoBase64) {
      return res.status(400).json({ success: false, message: "Video data is required." });
    }

    const account = await SocialAccount.findOne({ userId, platform: "youtube", isConnected: true });
    if (!account) {
      return res.status(404).json({ success: false, message: "YouTube account not connected. Please connect your YouTube account first." });
    }

    const videoBuffer = Buffer.from(videoBase64.split(',')[1] || videoBase64, 'base64');

    const result = await youtubeService.uploadVideo({
      accessToken: account.accessToken,
      title: title.trim(),
      description: description || '',
      tags: tags || [],
      categoryId: categoryId || '22',
      privacyStatus: privacyStatus || 'private',
      videoBuffer,
      mimeType: mimeType || 'video/mp4',
    });

    res.status(200).json({
      success: true,
      data: { videoId: result.videoId, url: result.url, isShort: result.isShort },
      message: result.isShort ? 'Short published to YouTube successfully.' : 'Video published to YouTube successfully.',
    });
  } catch (error) {
    console.error("YouTube publish error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getYouTubeAnalytics = async (req, res) => {
  try {
    const userId = req.userId;
    const { startDate, endDate, metrics, dimensions } = req.query;

    const account = await SocialAccount.findOne({ userId, platform: "youtube", isConnected: true });
    if (!account) {
      return res.status(404).json({ success: false, message: "YouTube account not connected." });
    }

    const data = await youtubeService.getAnalytics({
      accessToken: account.accessToken,
      startDate: startDate || '30daysAgo',
      endDate: endDate || 'today',
      metrics: metrics || 'views,estimatedMinutesWatched,subscribersGained,likes,comments,shares',
      dimensions,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("YouTube analytics error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getYouTubeVideos = async (req, res) => {
  try {
    const userId = req.userId;
    const { maxResults } = req.query;

    const account = await SocialAccount.findOne({ userId, platform: "youtube", isConnected: true });
    if (!account) {
      return res.status(404).json({ success: false, message: "YouTube account not connected." });
    }

    const videos = await youtubeService.getVideoList({
      accessToken: account.accessToken,
      maxResults: parseInt(maxResults) || 20,
    });

    res.status(200).json({ success: true, data: videos });
  } catch (error) {
    console.error("YouTube videos error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  getConnectedAccounts,
  connectLinkedIn,
  connectYouTube,
  connectTwitter,
  connectInstagram,
  connectFacebook,
  disconnectAccount,
  getAuthUrl,
  handleOAuthCallback,
  publishToLinkedIn,
  publishToYouTube,
  getYouTubeAnalytics,
  getYouTubeVideos,
};
