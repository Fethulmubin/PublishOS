import { generateCompletion as openaiCompletion } from "./openaiProvider.js";

const AI_PROVIDERS = {
  openai: openaiCompletion,
};

const generateWithProvider = async ({ provider, prompt, model, maxTokens }) => {
  const providerFn = AI_PROVIDERS[provider];
  if (!providerFn) throw new Error(`AI provider "${provider}" not supported`);
  return providerFn({ prompt, model, maxTokens });
};

export { generateWithProvider, AI_PROVIDERS };
