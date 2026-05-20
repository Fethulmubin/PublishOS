import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tabs, Tab, Button, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import CreatorProfileHeader from '../../Common/CreatorProfileHeader';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import EmptyState from '../../Common/EmptyState';
import GenericSkeleton from '../../Common/LoadingSkeleton';
import ArticleIcon from '@mui/icons-material/Article';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import BarChartIcon from '@mui/icons-material/BarChart';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LanguageIcon from '@mui/icons-material/Language';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { getProfile, getUserPosts, getCreatorInsights } from '../../../api';

const Profile = () => {
  const user = useSelector((state) => state?.auth?.authData);
  const [activeTab, setActiveTab] = useState('posts');
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, postsRes, insightsRes] = await Promise.all([
          getProfile(),
          getUserPosts().catch(() => ({ data: { data: [] } })),
          getCreatorInsights().catch(() => ({ data: { data: {} } })),
        ]);
        setProfile(profileRes.data?.data);
        setPosts(postsRes.data?.data || []);
        setInsights(insightsRes.data?.data);
      } catch (err) {
        console.error('Profile load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <GenericSkeleton count={3} />;

  const profileUser = profile?.user || user?.result;
  const profileStats = profile?.stats;

  return (
    <Box>
      <CreatorProfileHeader
        user={profileUser}
        stats={{
          posts: profileStats?.postCount?.toString() || '0',
          followers: '12.4K',
          following: '892',
          engagement: insights ? `${((insights.totalLikes / (insights.totalPosts || 1)) * 0.1).toFixed(1)}%` : '0%',
        }}
        socialLinks={{ website: profileUser?.website || 'creatorhub.io' }}
      />

      <Box sx={{ mt: 3, display: 'flex', gap: 1.5, flexWrap: 'wrap', mb: 3 }}>
        {[
          { icon: <LinkedInIcon sx={{ fontSize: 16 }} />, label: 'LinkedIn', color: '#0A66C2' },
          { icon: <TwitterIcon sx={{ fontSize: 16 }} />, label: 'Twitter', color: '#1DA1F2' },
          { icon: <InstagramIcon sx={{ fontSize: 16 }} />, label: 'Instagram', color: '#E4405F' },
          { icon: <YouTubeIcon sx={{ fontSize: 16 }} />, label: 'YouTube', color: '#FF0000' },
          { icon: <LanguageIcon sx={{ fontSize: 16 }} />, label: 'Website', color: '#6366f1' },
        ].map((link, i) => (
          <Chip
            key={i}
            icon={link.icon}
            label={link.label}
            size="small"
            variant="outlined"
            clickable
            sx={{ borderRadius: 1.5, fontWeight: 500, color: link.color, borderColor: `${link.color}30`, '&:hover': { bgcolor: `${link.color}08` } }}
          />
        ))}
      </Box>

      <Box
        sx={{
          bgcolor: '#ffffff',
          borderRadius: 3,
          border: '1px solid rgba(0,0,0,0.06)',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ borderBottom: '1px solid rgba(0,0,0,0.06)', px: 1 }}>
          <Tabs
            value={activeTab}
            onChange={(e, v) => setActiveTab(v)}
            sx={{
              minHeight: 48,
              '& .MuiTab-root': { minHeight: 48, py: 1, fontSize: '0.8125rem', fontWeight: 600, textTransform: 'none', color: '#64748b' },
              '& .Mui-selected': { color: '#6366f1' },
              '& .MuiTabs-indicator': { bgcolor: '#6366f1', height: 2.5, borderRadius: '2px 2px 0 0' },
            }}
          >
            <Tab value="posts" label="Published Posts" icon={<ArticleIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
            <Tab value="media" label="Media" icon={<PhotoLibraryIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
            <Tab value="analytics" label="Analytics" icon={<BarChartIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
          </Tabs>
        </Box>

        <Box sx={{ p: 2.5 }}>
          {activeTab === 'posts' && (
            <Box>
              {posts.length > 0 ? posts.map((post, i) => (
                <Box key={post._id || i} sx={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  p: 2, borderRadius: 2, '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
                  borderBottom: i < posts.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                }}>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>
                      {post.title || 'Untitled'}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.25 }}>
                      <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                        {post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>Likes</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>{post.likes?.length || 0}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>Comments</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#22c55e' }}>{post.comments?.length || 0}</Typography>
                    </Box>
                  </Box>
                </Box>
              )) : (
                <EmptyState icon={<ArticleIcon />} title="No posts yet" description="Your published posts will appear here." />
              )}
            </Box>
          )}

          {activeTab === 'media' && (
            <Grid container spacing={1.5}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid item xs={4} sm={3} md={2} key={i}>
                  <Box sx={{
                    aspectRatio: '1', borderRadius: 2,
                    bgcolor: ['#6366f1', '#7c3aed', '#0ea5e9', '#ec4899', '#22c55e', '#f59e0b'][i - 1],
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                    opacity: 0.85, transition: 'all 0.2s ease',
                    '&:hover': { opacity: 1, transform: 'scale(1.02)' },
                  }}>
                    <Typography variant="caption" sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.625rem' }}>
                      Media {i}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 'analytics' && (
            <Box>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {[
                  { icon: <VisibilityIcon sx={{ fontSize: 18 }} />, value: insights?.totalLikes ? `${(insights.totalLikes * 10).toLocaleString()}` : '0', label: 'Total Reach', color: '#6366f1' },
                  { icon: <FavoriteBorderIcon sx={{ fontSize: 18 }} />, value: insights?.totalLikes || '0', label: 'Total Likes', color: '#ec4899' },
                  { icon: <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />, value: insights?.totalComments || '0', label: 'Total Comments', color: '#0ea5e9' },
                  { icon: <BarChartIcon sx={{ fontSize: 18 }} />, value: insights?.totalPosts || '0', label: 'Posts Published', color: '#22c55e' },
                ].map((stat, i) => (
                  <Grid item xs={6} md={3} key={i}>
                    <Box sx={{ p: 2, borderRadius: 2, bgcolor: `${stat.color}06`, border: `1px solid ${stat.color}15`, textAlign: 'center' }}>
                      <Box sx={{ color: stat.color, mb: 0.5 }}>{stat.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>{stat.value}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.6875rem' }}>{stat.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ height: { xs: 100, sm: 160 }, borderRadius: 2, bgcolor: 'rgba(99,102,241,0.04)', p: { xs: 1, sm: 2 }, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                {[60, 45, 70, 55, 80, 65, 90, 75, 85, 70, 95, 80].map((h, i) => (
                  <Box key={i} sx={{ flex: 1, height: `${h}%`, borderRadius: '4px 4px 0 0', background: `linear-gradient(180deg, #6366f1, #6366f166)` }} />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
