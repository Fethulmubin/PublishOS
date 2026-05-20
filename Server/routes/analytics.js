import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getEngagement,
  getCreatorInsights,
  getContentPerformance,
  getAnalyticsOverview,
  getEngagementBreakdown,
} from "../controllers/analytics.js";

const router = express.Router();

router.get("/engagement", auth, getEngagement);
router.get("/insights", auth, getCreatorInsights);
router.get("/content-performance", auth, getContentPerformance);
router.get("/overview", auth, getAnalyticsOverview);
router.get("/breakdown", auth, getEngagementBreakdown);

export default router;
