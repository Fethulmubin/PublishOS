import { useState } from 'react';
import { Box, Typography, Grid, Tabs, Tab, Button, Chip } from '@mui/material';
import { useSelector } from 'react-redux';
import CreatorProfileHeader from '../../Common/CreatorProfileHeader';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import EmptyState from '../../Common/EmptyState';
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

const publishedPosts = [
  { title: 'How to Build a Personal Brand in 2026', platform: 'LinkedIn', date: 'Jun 12, 2026', engagement: '8.2%', reach: '24.5K' },
  { title: 'The Future of AI in Content Creation', platform: 'Twitter', date: 'Jun 10, 2026', engagement: '6.7%', reach: '18.2K' },
  { title: 'Behind the Scenes: My Content Setup', platform: 'Instagram', date: 'Jun 8, 2026', engagement: '9.1%', reach: '12.8K' },
  { title: '5 Lessons from Growing to 10K Followers', platform: 'LinkedIn', date: 'Jun 5, 2026', engagement: '5.4%', reach: '9.6K' },
  { title: 'Content Creation Tips for Beginners', platform: 'Blog', date: 'Jun 3, 2026', engagement: '4.8%', reach: '6.2K' },
];

const mediaItems = [
  { type: 'Carousel', title: 'Brand Building Guide', thumbnail: '#6366f1' },
  { type: 'Video', title: 'Content Creation Tips', thumbnail: '#7c3aed' },
  { type: 'Image', title: 'Setup Tour', thumbnail: '#0ea5e9' },
  { type: 'Carousel', title: '2026 Trends', thumbnail: '#ec4899' },
  { type: 'Video', title: 'Day in the Life', thumbnail: '#22c55e' },
  { type: 'Image', title: 'Workspace', thumbnail: '#f59e0b' },
];

const Profile = () => {
  const user = useSelector((state) => state?.auth?.authData);
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <Box>
      <CreatorProfileHeader
        user={user?.result}
        stats={{ posts: '47', followers: '12.4K', following: '892', engagement: '4.2%' }}
        socialLinks={{ website: 'creatorhub.io' }}
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
              {publishedPosts.map((post, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderRadius: 2,
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' },
                    borderBottom: i < publishedPosts.length - 1 ? '1px solid rgba(0,0,0,0.04)' : 'none',
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>
                      {post.title}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 0.25 }}>
                      <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#94a3b8' }}>{post.platform}</Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#94a3b8' }}>{post.date}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>Reach</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>{post.reach}</Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Typography variant="caption" sx={{ fontSize: '0.65rem', color: '#94a3b8' }}>Eng.</Typography>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#22c55e' }}>{post.engagement}</Typography>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
          )}

          {activeTab === 'media' && (
            <Grid container spacing={1.5}>
              {mediaItems.map((item, i) => (
                <Grid item xs={4} sm={3} md={2} key={i}>
                  <Box
                    sx={{
                      aspectRatio: '1',
                      borderRadius: 2,
                      bgcolor: item.thumbnail,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      opacity: 0.85,
                      transition: 'all 0.2s ease',
                      '&:hover': { opacity: 1, transform: 'scale(1.02)' },
                    }}
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: '#ffffff', fontWeight: 600, fontSize: '0.625rem', textAlign: 'center', px: 0.5 }}
                    >
                      {item.type}
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
                  { icon: <VisibilityIcon sx={{ fontSize: 18 }} />, value: '245.8K', label: 'Total Reach', color: '#6366f1' },
                  { icon: <FavoriteBorderIcon sx={{ fontSize: 18 }} />, value: '4.2%', label: 'Engagement Rate', color: '#ec4899' },
                  { icon: <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />, value: '1.2K', label: 'Total Comments', color: '#0ea5e9' },
                  { icon: <BarChartIcon sx={{ fontSize: 18 }} />, value: '47', label: 'Posts Published', color: '#22c55e' },
                ].map((stat, i) => (
                  <Grid item xs={6} md={3} key={i}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        bgcolor: `${stat.color}06`,
                        border: `1px solid ${stat.color}15`,
                        textAlign: 'center',
                      }}
                    >
                      <Box sx={{ color: stat.color, mb: 0.5 }}>{stat.icon}</Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>{stat.value}</Typography>
                      <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.6875rem' }}>{stat.label}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>

              <Box sx={{ height: 160, borderRadius: 2, bgcolor: 'rgba(99,102,241,0.04)', p: 2, display: 'flex', alignItems: 'flex-end', gap: 1 }}>
                {[60, 45, 70, 55, 80, 65, 90, 75, 85, 70, 95, 80].map((h, i) => (
                  <Box
                    key={i}
                    sx={{
                      flex: 1,
                      height: `${h}%`,
                      borderRadius: '4px 4px 0 0',
                      background: `linear-gradient(180deg, #6366f1, #6366f166)`,
                    }}
                  />
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
