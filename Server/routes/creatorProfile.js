import express from "express";
import { auth } from "../middleware/auth.js";
import { getProfile, updateProfile, getUserPosts } from "../controllers/creatorProfile.js";

const router = express.Router();

router.get("/", auth, getProfile);
router.get("/posts", auth, getUserPosts);
router.patch("/", auth, updateProfile);
router.get("/:id", getProfile);
router.get("/:id/posts", getUserPosts);

export default router;
