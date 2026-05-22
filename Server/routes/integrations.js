import express from "express";
import { auth } from "../middleware/auth.js";
import {
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
} from "../controllers/integrations.js";

const router = express.Router();

router.get("/", auth, getConnectedAccounts);
router.post("/connect/linkedin", auth, connectLinkedIn);
router.post("/connect/youtube", auth, connectYouTube);
router.post("/connect/twitter", auth, connectTwitter);
router.post("/connect/instagram", auth, connectInstagram);
router.post("/connect/facebook", auth, connectFacebook);
router.delete("/disconnect/:platform", auth, disconnectAccount);
router.get("/auth/:platform/url", auth, getAuthUrl);
router.get("/auth/:platform/callback", handleOAuthCallback);
router.post("/linkedin/post", auth, publishToLinkedIn);
router.post("/youtube/post", auth, publishToYouTube);
router.get("/youtube/analytics", auth, getYouTubeAnalytics);
router.get("/youtube/videos", auth, getYouTubeVideos);

export default router;
