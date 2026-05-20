import { generateWithProvider } from "./providers/index.js";

const generateHashtags = async ({ content, count = 5, platform }) => {
  const platformGuide = platform ? ` optimized for ${platform}` : "";

  const fullPrompt = `You are a social media hashtag strategist.
Given this content: "${content}"

Generate ${count} relevant, trending hashtags${platformGuide}.
Return ONLY the hashtags as a comma-separated list, no other text.
Each hashtag should start with # and be in camelCase or lowercase.`;

  const result = await generateWithProvider({
    provider: "openai",
    prompt: fullPrompt,
    maxTokens: 150,
  });

  const hashtags = result
    .split(",")
    .map((t) => t.trim())
    .filter((t) => t.startsWith("#"))
    .slice(0, count);

  return hashtags.length > 0 ? hashtags : ["#content", "#creator", "#growth", "#social", "#digital"].slice(0, count);
};

const optimizeHashtags = async ({ tags, platform }) => {
  if (!tags?.length) return [];
  const fullPrompt = `Optimize these hashtags for ${platform || "general"} platform to maximize reach and engagement: ${tags.join(", ")}.
Return ONLY 10 hashtags as a comma-separated list, ordered by estimated reach (highest first).`;

  const result = await generateWithProvider({
    provider: "openai",
    prompt: fullPrompt,
    maxTokens: 150,
  });

  return result.split(",").map((t) => t.trim()).filter((t) => t.startsWith("#")).slice(0, 10);
};

export { generateHashtags, optimizeHashtags };
