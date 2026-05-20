import { generateWithProvider } from "./providers/index.js";

const rewriteContent = async ({ content, tone = "professional", style }) => {
  const styleGuide = style ? ` in a ${style} format` : "";

  const fullPrompt = `You are a professional content editor. Rewrite the following content in a "${tone}" tone${styleGuide}.
Preserve all key information and facts.

Original content:
"""
${content}
"""

Rewritten version:`;

  const rewritten = await generateWithProvider({
    provider: "openai",
    prompt: fullPrompt,
    maxTokens: 800,
  });

  return {
    original: content,
    rewritten,
    tone,
    style,
    changes: [],
  };
};

const suggestTones = async ({ content }) => {
  const fullPrompt = `Given this content: "${content?.substring(0, 200)}..."
Suggest 5 alternative tones that would work well for repurposing this content.
Return ONLY a comma-separated list of tone names, no other text.`;

  const result = await generateWithProvider({
    provider: "openai",
    prompt: fullPrompt,
    maxTokens: 100,
  });

  return result.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 5);
};

export { rewriteContent, suggestTones };
