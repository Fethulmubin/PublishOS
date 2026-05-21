import mongoose from "mongoose";
import AIHistory from "../models/aiHistory.js";
import postMessage from "../models/postMessage.js";
import { generateCaption as captionService } from "../services/ai/captionGenerator.js";
import { rewriteContent as rewriteService } from "../services/ai/contentRewriter.js";
import { generateHashtags as hashtagService } from "../services/ai/hashtagGenerator.js";
import { getContentSuggestions as suggestionsService } from "../services/ai/contentSuggester.js";
import { structureForPost } from "../services/ai/contentTransformer.js";

const generateCaption = async (req, res) => {
  try {
    const { prompt, tone, platform, keywords } = req.body;
    const userId = req.userId;

    const caption = await captionService({ prompt, tone, platform, keywords });

    await AIHistory.create({
      userId,
      action: "generate_caption",
      input: prompt,
      output: caption,
      provider: "openai",
      metadata: { tone, platform },
    });

    res.status(200).json({ success: true, data: { caption } });
  } catch (error) {
    console.error("Caption generation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const rewriteContent = async (req, res) => {
  try {
    const { content, tone, style } = req.body;
    const userId = req.userId;

    const result = await rewriteService({ content, tone, style });

    await AIHistory.create({
      userId,
      action: "rewrite",
      input: content,
      output: result.rewritten,
      provider: "openai",
      metadata: { tone, style },
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Rewrite error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const generateHashtags = async (req, res) => {
  try {
    const { content, count, platform } = req.body;
    const userId = req.userId;

    const hashtags = await hashtagService({ content, count: count || 5, platform });

    await AIHistory.create({
      userId,
      action: "generate_hashtags",
      input: content,
      output: hashtags.join(", "),
      provider: "openai",
      metadata: { count, platform },
    });

    res.status(200).json({ success: true, data: { hashtags } });
  } catch (error) {
    console.error("Hashtag generation error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const getContentSuggestions = async (req, res) => {
  try {
    const userId = req.userId;
    const { niche } = req.query;

    const suggestions = await suggestionsService({ userId, niche });

    res.status(200).json({ success: true, data: { suggestions } });
  } catch (error) {
    console.error("Suggestions error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const repurposeContent = async (req, res) => {
  try {
    const { content, sourcePlatform, targetPlatform } = req.body;
    const userId = req.userId;

    const { repurposeForPlatform } = await import("../services/ai/contentRepurposer.js");
    const result = await repurposeForPlatform({ content, sourcePlatform, targetPlatform });

    await AIHistory.create({
      userId,
      action: "repurpose",
      input: content,
      output: result.repurposed,
      provider: "openai",
      metadata: { sourcePlatform, targetPlatform },
    });

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error("Repurpose error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const generateContent = async (req, res) => {
  try {
    const { type, ...params } = req.body;
    const userId = req.userId;

    switch (type) {
      case "caption":
        return generateCaption(req, res);
      case "rewrite":
        return rewriteContent(req, res);
      case "hashtags":
        return generateHashtags(req, res);
      case "repurpose":
        return repurposeContent(req, res);
      default:
        return generateCaption(req, res);
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getHistory = async (req, res) => {
  try {
    const history = await AIHistory.find({ userId: req.userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const structureContent = async (req, res) => {
  try {
    const { content, tone, platform } = req.body;
    if (!content || !content.trim()) {
      return res.status(400).json({ success: false, message: "Content is required." });
    }
    const structured = await structureForPost({ content, tone, platform });
    res.status(200).json({ success: true, data: structured });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const enhancePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }

    const post = await postMessage.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found." });
    }
    if (userId !== post.posterId.toString()) {
      return res.status(401).json({ success: false, message: "You can only edit your own posts." });
    }

    const updatedPost = await postMessage.findByIdAndUpdate(
      id,
      { message: content },
      { new: true }
    );

    res.status(200).json({ success: true, data: updatedPost });
  } catch (error) {
    console.error("Enhance post error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { generateCaption, rewriteContent, generateHashtags, getContentSuggestions, getHistory, repurposeContent, generateContent, enhancePost, structureContent };
