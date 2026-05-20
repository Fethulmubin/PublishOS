import axios from 'axios'

const isProd = window.location.hostname !== 'localhost';
let url = import.meta.env.VITE_API_URL || (isProd ? 'https://memories-backend-8rsy.onrender.com/' : 'http://localhost:5555/');
if (!url.endsWith('/')) url += '/';

const API = axios.create({ baseURL: url });

API.interceptors.request.use(
  (config) => {
    const tokenParsed = localStorage.getItem('profile');
    const {token} = tokenParsed ? JSON.parse(tokenParsed) : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('profile');
    }
    return Promise.reject(error);
  }
);

// Posts
export const fetchPosts = ()=> axios.get(`${url}posts`);
export const createPosts = (newPost)=> API.post('posts', newPost );
export const updatePosts = (id, updatedPost)=> API.patch(`posts/${id}`, updatedPost );
export const deletePosts = (id)=> API.delete(`posts/${id}` );
export const likePosts = (id)=> API.patch(`posts/${id}/like`);

// Authentication
export const signIn = (formData) => axios.post(`${url}users/signin`, formData);
export const signUp = (formData) => axios.post(`${url}users/signup`, formData);

// Comments
export const addComments = (id, comment) => API.post(`comments/addComment/${id}`, {comment});
export const getComments = (id) => API.get(`comments/getComments/${id}`);

// Dashboard
export const getDashboardOverview = () => API.get('api/dashboard/overview');
export const getDashboardStats = () => API.get('api/dashboard/stats');
export const getDashboardQuickActions = () => API.get('api/dashboard/quick-actions');

// AI Studio
export const generateCaption = (data) => API.post('api/ai/generate-caption', data);
export const rewriteContent = (data) => API.post('api/ai/rewrite', data);
export const repurposeContent = (data) => API.post('api/ai/repurpose', data);
export const generateContent = (data) => API.post('api/ai/generate', data);
export const generateHashtags = (data) => API.post('api/ai/generate-hashtags', data);
export const getContentSuggestions = () => API.get('api/ai/suggestions');
export const getAIHistory = () => API.get('api/ai/history');
export const enhancePost = (id, content) => API.patch(`api/ai/enhance-post/${id}`, { content });

// Schedule
export const getScheduledPosts = () => API.get('api/schedule');
export const createScheduledPost = (data) => API.post('api/schedule', data);
export const updateScheduledPost = (id, data) => API.patch(`api/schedule/${id}`, data);
export const deleteScheduledPost = (id) => API.delete(`api/schedule/${id}`);
export const getScheduleStats = () => API.get('api/schedule/stats');

// Analytics
export const getEngagement = () => API.get('api/analytics/engagement');
export const getCreatorInsights = () => API.get('api/analytics/insights');
export const getContentPerformance = () => API.get('api/analytics/content-performance');
export const getAnalyticsOverview = () => API.get('api/analytics/overview');
export const getEngagementBreakdown = () => API.get('api/analytics/breakdown');

// Notifications
export const getNotifications = () => API.get('api/notifications');
export const getUnreadCount = () => API.get('api/notifications/unread-count');
export const markNotificationAsRead = (id) => API.patch(`api/notifications/${id}/read`);
export const markAllNotificationsAsRead = () => API.patch('api/notifications/read-all');
export const deleteNotification = (id) => API.delete(`api/notifications/${id}`);

// Profile
export const getProfile = (id) => id ? API.get(`api/profile/${id}`) : API.get('api/profile');
export const updateProfile = (data) => API.patch('api/profile', data);
export const getUserPosts = (id) => id ? API.get(`api/profile/${id}/posts`) : API.get('api/profile/posts');

// Settings
export const getSettings = () => API.get('api/settings');
export const updateSettings = (data) => API.patch('api/settings', data);
export const changePassword = (data) => API.post('api/settings/change-password', data);
export const updateThemePreference = (data) => API.patch('api/settings/theme', data);

// Integrations
export const getConnectedAccounts = () => API.get('api/integrations');
export const getLinkedInAuthUrl = () => API.get('api/integrations/auth/linkedin/url');
export const disconnectPlatform = (platform) => API.delete(`api/integrations/disconnect/${platform}`);
export const publishToLinkedIn = (content) => API.post('api/integrations/linkedin/post', { content });
