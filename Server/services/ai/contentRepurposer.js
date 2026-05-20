import { generateWithProvider } from "./providers/index.js";

const repurposeForPlatform = async ({ content, sourcePlatform, targetPlatform }) => {
  const fullPrompt = `You are a content repurposing expert. Repurpose this ${sourcePlatform || "source"} content for ${targetPlatform || "another platform"}.

Important platform guidelines:
- LinkedIn: Professional tone, longer form (200-300 words), industry insights
- Twitter: Concise (under 280 chars), punchy, thread-friendly
- Instagram: Visual-first descriptions, emoji-friendly, hashtag-rich
- Facebook: Conversational, discussion-encouraging, medium length
- Blog: Detailed, structured with headings, 500+ words
- TikTok: Short, trend-aware, hook-driven, casual

Original content:
"""
${content}
"""

Repurposed version for ${targetPlatform || "the target platform"}:`;

  const repurposed = await generateWithProvider({
    provider: "openai",
    prompt: fullPrompt,
    maxTokens: 800,
  });

  return {
    original: content,
    repurposed,
    sourcePlatform: sourcePlatform || "unknown",
    targetPlatform: targetPlatform || "unknown",
    changes: [],
  };
};

const repurposeBatch = async (items) => {
  return Promise.all(items.map((item) => repurposeForPlatform(item)));
};

export { repurposeForPlatform, repurposeBatch };
