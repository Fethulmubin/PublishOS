const LINKEDIN_AUTH_URL = 'https://www.linkedin.com/oauth/v2/authorization';
const LINKEDIN_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken';
const LINKEDIN_API_URL = 'https://api.linkedin.com';

const SCOPES = ['openid', 'profile', 'email', 'w_member_social'];

const getAuthUrl = (clientId, redirectUri, state) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SCOPES.join(' '),
    state: state || '',
  });
  return `${LINKEDIN_AUTH_URL}?${params.toString()}`;
};

const exchangeCodeForToken = async (code, clientId, clientSecret, redirectUri) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  });

  const response = await fetch(LINKEDIN_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LinkedIn token exchange failed: ${error}`);
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || null,
    expiresIn: data.expires_in,
  };
};

const getProfile = async (accessToken) => {
  const response = await fetch(`${LINKEDIN_API_URL}/v2/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch LinkedIn profile');
  }

  const data = await response.json();
  return {
    name: data.name || `${data.given_name} ${data.family_name}`,
    avatar: data.picture,
    username: data.preferred_username || data.sub,
    linkedinId: data.sub,
    email: data.email,
  };
};

const publishPost = async ({ accessToken, content }) => {
  const profileResponse = await fetch(`${LINKEDIN_API_URL}/v2/userinfo`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const profileData = await profileResponse.json();
  const author = `urn:li:person:${profileData.sub}`;

  const body = {
    author,
    commentary: content,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false,
  };

  const response = await fetch(`${LINKEDIN_API_URL}/rest/posts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0',
      'LinkedIn-Version': '202603',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`LinkedIn post failed: ${error}`);
  }

  const location = response.headers.get('x-restli-id') || response.headers.get('id');
  return { success: true, platformPostId: location || 'published' };
};

export { getAuthUrl, exchangeCodeForToken, publishPost, getProfile };
