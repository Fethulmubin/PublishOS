import express from "express";
import { auth } from "../middleware/auth.js";
import { getOverview, getStats, getQuickActions } from "../controllers/dashboard.js";

const router = express.Router();

router.get("/overview", auth, getOverview);
router.get("/stats", auth, getStats);
router.get("/quick-actions", auth, getQuickActions);

export default router;
