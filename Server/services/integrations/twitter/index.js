const getAuthUrl = () => {
  return `[Twitter OAuth URL placeholder]`;
};

const exchangeCodeForToken = async (code) => {
  return { accessToken: "[placeholder]", refreshToken: "[placeholder]", expiresIn: 7200 };
};

const publishPost = async ({ accessToken, content, mediaUrls }) => {
  return { success: true, platformPostId: "[twitter_post_id]" };
};

const getProfile = async (accessToken) => {
  return { name: "[name]", avatar: "[avatar]", username: "[username]" };
};

export { getAuthUrl, exchangeCodeForToken, publishPost, getProfile };
