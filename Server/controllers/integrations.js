import SocialAccount from "../models/socialAccount.js";
import * as linkedinService from "../services/integrations/linkedin/index.js";

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

    res.redirect(`${frontendUrl}/settings`);
  } catch (error) {
    console.error("OAuth callback error:", error);
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/settings?linkedin=error`);
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

export {
  getConnectedAccounts,
  connectLinkedIn,
  connectTwitter,
  connectInstagram,
  connectFacebook,
  disconnectAccount,
  getAuthUrl,
  handleOAuthCallback,
  publishToLinkedIn,
};
