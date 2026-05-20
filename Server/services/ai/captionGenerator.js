import { generateWithProvider } from "./providers/index.js";
import { CAPTION_PROMPTS, PLATFORM_INSTRUCTIONS } from "./prompts/captionPrompts.js";

const generateCaption = async ({ prompt, tone = "professional", platform = "linkedin", keywords }) => {
  const toneGuide = CAPTION_PROMPTS[tone] || CAPTION_PROMPTS.professional;
  const platformGuide = PLATFORM_INSTRUCTIONS[platform] || PLATFORM_INSTRUCTIONS.linkedin;
  const keywordGuide = keywords?.length ? `Include these keywords naturally: ${keywords.join(", ")}.` : "";

  const fullPrompt = `You are a professional social media content creator. 
${toneGuide}.
${platformGuide}.
${keywordGuide}

Topic: "${prompt}"

Write an engaging social media post. Use line breaks for readability. Do not use hashtags unless specified. Keep it under 300 words.`;

  const result = await generateWithProvider({
    provider: "openai",
    prompt: fullPrompt,
    maxTokens: 600,
  });

  return result;
};

const generateCaptionBatch = async (inputs) => {
  return Promise.all(inputs.map((input) => generateCaption(input)));
};

export { generateCaption, generateCaptionBatch };
