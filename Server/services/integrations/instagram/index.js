const getAuthUrl = () => {
  return `[Instagram OAuth URL placeholder]`;
};

const exchangeCodeForToken = async (code) => {
  return { accessToken: "[placeholder]", refreshToken: "[placeholder]", expiresIn: 5184000 };
};

const publishPost = async ({ accessToken, content, mediaUrls }) => {
  return { success: true, platformPostId: "[instagram_media_id]" };
};

const getProfile = async (accessToken) => {
  return { name: "[name]", avatar: "[avatar]", username: "[username]" };
};

export { getAuthUrl, exchangeCodeForToken, publishPost, getProfile };
