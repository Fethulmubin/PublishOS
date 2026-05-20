import * as linkedin from "./linkedin/index.js";
import * as twitter from "./twitter/index.js";
import * as instagram from "./instagram/index.js";
import * as facebook from "./facebook/index.js";

const PLATFORMS = {
  linkedin,
  twitter,
  instagram,
  facebook,
};

const getPlatformService = (platform) => {
  const service = PLATFORMS[platform];
  if (!service) throw new Error(`Platform "${platform}" is not supported`);
  return service;
};

const publishToPlatform = async ({ platform, accessToken, content, mediaUrls }) => {
  const service = getPlatformService(platform);
  return service.publishPost({ accessToken, content, mediaUrls });
};

const getProfileFromPlatform = async ({ platform, accessToken }) => {
  const service = getPlatformService(platform);
  return service.getProfile(accessToken);
};

export { PLATFORMS, getPlatformService, publishToPlatform, getProfileFromPlatform };
