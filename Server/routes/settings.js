import express from "express";
import { auth } from "../middleware/auth.js";
import { getSettings, updateSettings, changePassword, updateThemePreference } from "../controllers/settings.js";

const router = express.Router();

router.get("/", auth, getSettings);
router.patch("/", auth, updateSettings);
router.post("/change-password", auth, changePassword);
router.patch("/theme", auth, updateThemePreference);

export default router;
