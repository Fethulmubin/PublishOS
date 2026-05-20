import { repurposeForPlatform } from "../contentRepurposer.js";
import { optimizeSEO } from "../seoOptimizer.js";

const TRANSFORMERS = {
  repurpose: repurposeForPlatform,
  seo: optimizeSEO,
};

const transform = async ({ type, params }) => {
  const transformer = TRANSFORMERS[type];
  if (!transformer) throw new Error(`Transformer "${type}" not found`);
  return transformer(params);
};

export { transform, TRANSFORMERS };
