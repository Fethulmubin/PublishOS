import SocialAccount from "../../models/socialAccount.js";

const refreshToken = async (userId, platform) => {
  const account = await SocialAccount.findOne({ userId, platform });
  if (!account) throw new Error(`${platform} account not found`);

  if (account.tokenExpiresAt && new Date() > account.tokenExpiresAt) {
    account.accessToken = "[refreshed_token_placeholder]";
    account.tokenExpiresAt = new Date(Date.now() + 5184000000);
    await account.save();
  }

  return account.accessToken;
};

const isTokenExpired = (account) => {
  return account.tokenExpiresAt && new Date() > account.tokenExpiresAt;
};

export { refreshToken, isTokenExpired };
