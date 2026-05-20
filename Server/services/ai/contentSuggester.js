import { generateWithProvider } from "./providers/index.js";

const getContentSuggestions = async ({ userId, niche, recentPosts }) => {
  const nicheGuide = niche ? ` in the ${niche} niche` : "";
  const recentGuide = recentPosts?.length
    ? `\nRecent topics (avoid these unless expanding): ${recentPosts.slice(0, 5).join(", ")}`
    : "";

  const fullPrompt = `You are a content strategy expert. Suggest 5 engaging content ideas for a creator${nicheGuide}.
Each idea should have a compelling title and a brief description of the angle.
Format each as: "Title: [title] | Description: [1-sentence description]"${recentGuide}`;

  try {
    const result = await generateWithProvider({
      provider: "openai",
      prompt: fullPrompt,
      maxTokens: 500,
    });

    const suggestions = result
      .split("\n")
      .filter((line) => line.includes("|"))
      .map((line, i) => {
        const [titlePart, descPart] = line.split("|");
        const title = titlePart.replace(/^[\d.]+[\s]*"?Title:?\s*"?/i, "").replace(/^["']|["']$/g, "").trim();
        const description = descPart?.replace(/^"?Description:?\s*"?/i, "").replace(/^["']|["']$/g, "").trim() || "";
        return { id: String(i + 1), title: title || `Content Idea ${i + 1}`, description };
      })
      .filter((s) => s.title.length > 0);

    return suggestions.length >= 3 ? suggestions : [
      { id: "1", title: "Top 10 Creator Tips", description: "Share your expertise with actionable advice" },
      { id: "2", title: "Behind the Scenes", description: "Show your creative process authentically" },
      { id: "3", title: "Industry Trends", description: "Discuss what's changing in your space" },
    ];
  } catch (error) {
    return [
      { id: "1", title: "Top 10 Creator Tips", description: "Share your expertise with actionable advice" },
      { id: "2", title: "Behind the Scenes", description: "Show your creative process authentically" },
      { id: "3", title: "Industry Trends", description: "Discuss what's changing in your space" },
    ];
  }
};

const getTrendingTopics = async ({ platform, niche }) => {
  const fullPrompt = `List 5 trending topics${niche ? ` in ${niche}` : ""}${platform ? ` on ${platform}` : ""} right now.
Return ONLY as a comma-separated list of topic names, no other text.`;

  try {
    const result = await generateWithProvider({
      provider: "openai",
      prompt: fullPrompt,
      maxTokens: 150,
    });
    return result.split(",").map((t) => t.trim()).filter(Boolean);
  } catch (error) {
    return [];
  }
};

export { getContentSuggestions, getTrendingTopics };
