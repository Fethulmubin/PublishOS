import express from "express";
import { auth } from "../middleware/auth.js";
import {
  generateCaption,
  rewriteContent,
  generateHashtags,
  getContentSuggestions,
  getHistory,
  repurposeContent,
  generateContent,
  enhancePost,
  structureContent,
} from "../controllers/aiStudio.js";

const router = express.Router();

router.post("/generate", auth, generateContent);
router.post("/generate-caption", auth, generateCaption);
router.post("/rewrite", auth, rewriteContent);
router.post("/repurpose", auth, repurposeContent);
router.post("/generate-hashtags", auth, generateHashtags);
router.get("/suggestions", auth, getContentSuggestions);
router.get("/history", auth, getHistory);
router.patch("/enhance-post/:id", auth, enhancePost);
router.post("/structure", auth, structureContent);

export default router;
