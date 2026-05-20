import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getScheduledPosts,
  createScheduledPost,
  updateScheduledPost,
  deleteScheduledPost,
  getScheduleStats,
} from "../controllers/schedule.js";

const router = express.Router();

router.get("/", auth, getScheduledPosts);
router.post("/", auth, createScheduledPost);
router.patch("/:id", auth, updateScheduledPost);
router.delete("/:id", auth, deleteScheduledPost);
router.get("/stats", auth, getScheduleStats);

export default router;
