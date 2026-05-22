const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token';
const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3';
const YOUTUBE_UPLOAD_BASE = 'https://www.googleapis.com/upload/youtube/v3';
const YT_ANALYTICS_BASE = 'https://youtubeanalytics.googleapis.com/v2';

const SCOPES = [
  'openid', 'profile', 'email',
  'https://www.googleapis.com/auth/youtube.upload',
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/yt-analytics.readonly',
];

const getAuthUrl = (clientId, redirectUri, state) => {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: SCOPES.join(' '),
    access_type: 'offline',
    state: state || '',
  });
  return `${GOOGLE_AUTH_URL}?${params.toString()}`;
};

const exchangeCodeForToken = async (code, clientId, clientSecret, redirectUri) => {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
  });

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`YouTube token exchange failed: ${error}`);
  }

  const data = await response.json();
  return {
    accessToken: data.access_token,
    refreshToken: data.refresh_token || null,
    expiresIn: data.expires_in,
  };
};

const getChannelInfo = async (accessToken) => {
  const params = new URLSearchParams({ part: 'snippet,statistics', mine: 'true' });
  const response = await fetch(`${YOUTUBE_API_BASE}/channels?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch YouTube channel info');
  }

  const data = await response.json();
  const channel = data.items?.[0];
  if (!channel) throw new Error('No YouTube channel found. Create a channel first.');

  return {
    channelId: channel.id,
    name: channel.snippet.title,
    avatar: channel.snippet.thumbnails?.default?.url,
    subscriberCount: channel.statistics?.subscriberCount || '0',
    videoCount: channel.statistics?.videoCount || '0',
    viewCount: channel.statistics?.viewCount || '0',
  };
};

const uploadVideo = async ({ accessToken, title, description, tags, categoryId, privacyStatus, videoBuffer, mimeType }) => {
  // Step 1: Initiate resumable upload session — send metadata, get upload URL
  const metadata = {
    snippet: {
      title,
      description: description || '',
      tags: tags || [],
      categoryId: categoryId || '22',
    },
    status: {
      privacyStatus: privacyStatus || 'private',
      selfDeclaredMadeForKids: false,
    },
  };

  const initParams = new URLSearchParams({ part: 'snippet,status', uploadType: 'resumable' });
  const initResponse = await fetch(`${YOUTUBE_UPLOAD_BASE}/videos?${initParams.toString()}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Upload-Content-Type': mimeType || 'video/*',
    },
    body: JSON.stringify(metadata),
  });

  if (!initResponse.ok) {
    const error = await initResponse.text();
    throw new Error(`YouTube upload initiation failed: ${error}`);
  }

  const uploadUrl = initResponse.headers.get('Location');
  if (!uploadUrl) throw new Error('No upload URL returned from YouTube');

  // Step 2: Upload the actual video binary
  const uploadResponse = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': mimeType || 'application/octet-stream',
      'Content-Length': videoBuffer.length.toString(),
    },
    body: videoBuffer,
  });

  if (!uploadResponse.ok) {
    const error = await uploadResponse.text();
    throw new Error(`YouTube video upload failed: ${error}`);
  }

  const videoData = await uploadResponse.json();
  const isShort = videoData.snippet?.tags?.includes('#Shorts') ||
    videoData.snippet?.title?.includes('#Shorts') ||
    videoData.snippet?.description?.includes('#Shorts');

  return {
    success: true,
    videoId: videoData.id,
    title: videoData.snippet?.title,
    isShort,
    url: isShort
      ? `https://www.youtube.com/shorts/${videoData.id}`
      : `https://www.youtube.com/watch?v=${videoData.id}`,
  };
};

const getAnalytics = async ({ accessToken, startDate, endDate, metrics, dimensions }) => {
  const params = new URLSearchParams({
    ids: 'channel==MINE',
    startDate: startDate || '30daysAgo',
    endDate: endDate || 'today',
    metrics: metrics || 'views,estimatedMinutesWatched,subscribersGained,likes,comments,shares',
  });

  if (dimensions) params.set('dimensions', dimensions);

  const response = await fetch(`${YT_ANALYTICS_BASE}/reports?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`YouTube analytics fetch failed: ${error}`);
  }

  const data = await response.json();
  return data;
};

const getVideoList = async ({ accessToken, maxResults }) => {
  const params = new URLSearchParams({
    part: 'snippet,statistics,contentDetails',
    mine: 'true',
    maxResults: String(maxResults || 20),
    order: 'date',
  });

  const response = await fetch(`${YOUTUBE_API_BASE}/videos?${params.toString()}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch YouTube video list');
  }

  const data = await response.json();
  return data.items?.map((item) => ({
    videoId: item.id,
    title: item.snippet.title,
    thumbnail: item.snippet.thumbnails?.default?.url,
    publishedAt: item.snippet.publishedAt,
    viewCount: item.statistics?.viewCount || '0',
    likeCount: item.statistics?.likeCount || '0',
    commentCount: item.statistics?.commentCount || '0',
    isShort: item.snippet.tags?.includes('#Shorts') || item.snippet.title?.includes('#Shorts'),
  })) || [];
};

export {
  getAuthUrl,
  exchangeCodeForToken,
  getChannelInfo,
  uploadVideo,
  getAnalytics,
  getVideoList,
};
