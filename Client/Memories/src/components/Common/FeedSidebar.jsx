import { useState, useEffect } from 'react';
import { Box, Typography, Button, Chip, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { useNavigate } from 'react-router-dom';
import { getScheduledPosts } from '../../api';
import LinkedInPublishDialog from './LinkedInPublishDialog';
import YouTubePublishDialog from './YouTubePublishDialog';

const quickActions = [
  { icon: <AddIcon />, label: 'Create Post', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', action: 'newPost' },
  { icon: <ScheduleIcon />, label: 'Schedule Post', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', action: 'schedule' },
  { icon: <LinkedInIcon />, label: 'Publish LinkedIn', color: '#0A66C2', bg: 'rgba(10,102,194,0.1)', action: 'linkedin' },
  { icon: <YouTubeIcon />, label: 'Upload YouTube', color: '#FF0000', bg: 'rgba(255,0,0,0.1)', action: 'youtube' },
  { icon: <InstagramIcon />, label: 'Post Instagram', color: '#E4405F', bg: 'rgba(228,64,95,0.1)', action: 'instagram' },
];

const statusConfig = {
  scheduled: { color: '#6366f1', bg: '#6366f110', label: 'Scheduled' },
  draft: { color: '#64748b', bg: '#64748b10', label: 'Draft' },
  published: { color: '#22c55e', bg: '#22c55e10', label: 'Published' },
  failed: { color: '#ef4444', bg: '#ef444410', label: 'Failed' },
};

const platformColors = {
  linkedin: '#0A66C2',
  twitter: '#1DA1F2',
  instagram: '#E4405F',
  facebook: '#1877F2',
  youtube: '#FF0000',
};

const FeedSidebar = ({ onNewPost }) => {
  const navigate = useNavigate();
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(true);
  const [linkedInOpen, setLinkedInOpen] = useState(false);
  const [youtubeOpen, setYoutubeOpen] = useState(false);

  useEffect(() => {
    getScheduledPosts()
      .then((res) => {
        const all = res.data?.data || [];
        setScheduledPosts(all.filter((p) => p.status === 'scheduled' || p.status === 'draft').slice(0, 4));
      })
      .catch(() => {})
      .finally(() => setLoadingSchedule(false));
  }, []);

  const handleAction = (action) => {
    if (action === 'newPost') onNewPost?.();
    else if (action === 'schedule') navigate('/schedule');
    else if (action === 'linkedin') setLinkedInOpen(true);
    else if (action === 'youtube') setYoutubeOpen(true);
    else if (action === 'instagram') window.open('https://instagram.com', '_blank');
  };

  return (
    <Box>
      <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 2, mb: 2.5 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a', mb: 1.5 }}>
          Quick Actions
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {quickActions.map((item) => (
            <Button
              key={item.label}
              fullWidth
              startIcon={item.icon}
              onClick={() => handleAction(item.action)}
              sx={{
                justifyContent: 'flex-start', px: 1.5, py: 1, borderRadius: 2,
                color: item.color, bgcolor: item.bg, fontSize: '0.8125rem', fontWeight: 600,
                textTransform: 'none', minHeight: 40,
                '&:hover': { bgcolor: item.color + '18' },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Box>

      <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a' }}>
            Upcoming Posts
          </Typography>
          <Button size="small" onClick={() => navigate('/schedule')} sx={{ fontSize: '0.6875rem', fontWeight: 600, color: '#6366f1', minWidth: 0, px: 0 }}>
            View All
          </Button>
        </Box>

        {loadingSchedule ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
            <CircularProgress size={20} sx={{ color: '#6366f1' }} />
          </Box>
        ) : scheduledPosts.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <CalendarMonthIcon sx={{ fontSize: 28, color: '#cbd5e1', mb: 0.5 }} />
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem', display: 'block' }}>
              No upcoming posts
            </Typography>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {scheduledPosts.map((post) => {
              const status = statusConfig[post.status] || statusConfig.draft;
              const platformColor = platformColors[post.platforms?.[0]] || '#64748b';
              return (
                <Box key={post._id} sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid rgba(0,0,0,0.04)' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: platformColor }} />
                    <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem', color: platformColor, textTransform: 'capitalize' }}>
                      {post.platforms?.[0] || 'draft'}
                    </Typography>
                    <Chip label={status.label} size="small" sx={{ height: 18, fontSize: '0.625rem', fontWeight: 600, bgcolor: status.bg, color: status.color, ml: 'auto' }} />
                  </Box>
                  <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {post.content}
                  </Typography>
                  {post.scheduledAt && (
                    <Typography variant="caption" sx={{ fontSize: '0.625rem', color: '#94a3b8', mt: 0.5, display: 'block' }}>
                      {new Date(post.scheduledAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>
        )}
      </Box>

      <LinkedInPublishDialog open={linkedInOpen} onClose={() => setLinkedInOpen(false)} />
      <YouTubePublishDialog open={youtubeOpen} onClose={() => setYoutubeOpen(false)} />
    </Box>
  );
};

export default FeedSidebar;
