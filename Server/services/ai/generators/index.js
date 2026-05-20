import { generateCaption } from "../captionGenerator.js";
import { generateHashtags } from "../hashtagGenerator.js";
import { rewriteContent } from "../contentRewriter.js";
import { getContentSuggestions } from "../contentSuggester.js";

const AI_GENERATORS = {
  caption: generateCaption,
  hashtags: generateHashtags,
  rewrite: rewriteContent,
  suggestions: getContentSuggestions,
};

const generate = async ({ type, params }) => {
  const generator = AI_GENERATORS[type];
  if (!generator) throw new Error(`Generator "${type}" not found`);
  return generator(params);
};

export { generate, AI_GENERATORS };
