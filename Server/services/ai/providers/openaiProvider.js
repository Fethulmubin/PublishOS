import OpenAI from "openai";

const getClient = () => {
  return new OpenAI({ baseURL: "https://openrouter.ai/api/v1", apiKey: process.env.OPENROUTER_API_KEY });
};

const generateCompletion = async ({ prompt, model, maxTokens }) => {
  const openai = getClient();
  const response = await openai.chat.completions.create({
    model: model || "poolside/laguna-m.1:free",
    messages: [{ role: "user", content: prompt }],
    max_tokens: maxTokens || 500,
  });
  return response.choices[0]?.message?.content || "";
};

export { generateCompletion };
