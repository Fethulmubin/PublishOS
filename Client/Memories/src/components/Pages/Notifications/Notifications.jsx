import { useState } from 'react';
import { Box, Typography, Tabs, Tab, Chip } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import PublishIcon from '@mui/icons-material/Publish';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import NotificationCard from '../../Common/NotificationCard';
import EmptyState from '../../Common/EmptyState';

const allNotifications = [
  { icon: <FavoriteIcon />, color: '#ef4444', title: 'Post Performance', message: 'Your LinkedIn post "Content Strategy Tips" reached 2,500 people and got 189 likes.', time: '2 hours ago', unread: true, category: 'all' },
  { icon: <AutoAwesomeIcon />, color: '#7c3aed', title: 'AI Suggestions Ready', message: 'AI generated 5 new caption suggestions based on your top-performing content.', time: '3 hours ago', unread: true, category: 'ai' },
  { icon: <CheckCircleIcon />, color: '#22c55e', title: 'Post Published', message: 'Your scheduled post "The Future of Creator Economy" was published successfully on Twitter.', time: '5 hours ago', unread: true, category: 'publishing' },
  { icon: <PeopleIcon />, color: '#6366f1', title: 'New Followers', message: 'You gained 45 new followers in the last 24 hours. Your engagement rate is up 12%.', time: '6 hours ago', unread: true, category: 'all' },
  { icon: <CommentIcon />, color: '#0ea5e9', title: 'New Comment', message: 'Sarah J. commented on your post: "This is incredibly helpful! Thanks for sharing."', time: '8 hours ago', unread: false, category: 'mentions' },
  { icon: <AutoAwesomeIcon />, color: '#7c3aed', title: 'Content Repurpose', message: 'AI suggests repurposing your top blog post into a LinkedIn carousel and Twitter thread.', time: '10 hours ago', unread: false, category: 'ai' },
  { icon: <PostAddIcon />, color: '#f59e0b', title: 'Weekly Digest', message: 'Your weekly content performance report is ready. You published 7 posts this week.', time: '1 day ago', unread: false, category: 'all' },
  { icon: <CheckCircleIcon />, color: '#22c55e', title: 'Schedule Confirmed', message: 'Your post for Wednesday at 2:00 PM has been scheduled successfully on Instagram.', time: '1 day ago', unread: false, category: 'publishing' },
  { icon: <FavoriteIcon />, color: '#ef4444', title: 'Milestone Reached', message: 'Your post "5 Tips for Creators" crossed 10,000 impressions! Your best performing post yet.', time: '2 days ago', unread: false, category: 'all' },
  { icon: <PeopleIcon />, color: '#6366f1', title: 'Mention Alert', message: 'Alex M. mentioned you in a LinkedIn post about content creation trends for 2026.', time: '2 days ago', unread: false, category: 'mentions' },
  { icon: <WarningIcon />, color: '#ef4444', title: 'Post Failed', message: 'Scheduled post for TikTok failed to publish. Please check your connection and try again.', time: '3 days ago', unread: false, category: 'publishing' },
  { icon: <AutoAwesomeIcon />, color: '#7c3aed', title: 'AI Analysis Complete', message: 'AI analyzed your content strategy and found 3 opportunities for improvement.', time: '3 days ago', unread: false, category: 'ai' },
];

const tabs = [
  { label: 'All', key: 'all' },
  { label: 'Mentions', key: 'mentions' },
  { label: 'Comments', key: 'comments' },
  { label: 'AI Suggestions', key: 'ai' },
  { label: 'Publishing', key: 'publishing' },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = activeTab === 'all'
    ? allNotifications
    : allNotifications.filter((n) => n.category === activeTab);

  const unreadCount = allNotifications.filter((n) => n.unread).length;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.35rem', color: '#0f172a' }}>
            Notifications
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Stay updated with your content and community
          </Typography>
        </Box>
        {unreadCount > 0 && (
          <Chip
            label={`${unreadCount} unread`}
            size="small"
            sx={{ borderRadius: 1.5, fontWeight: 600, fontSize: '0.75rem', bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1' }}
          />
        )}
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
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              minHeight: 48,
              '& .MuiTab-root': { minHeight: 48, py: 1, fontSize: '0.8125rem', fontWeight: 600, textTransform: 'none', color: '#64748b' },
              '& .Mui-selected': { color: '#6366f1' },
              '& .MuiTabs-indicator': { bgcolor: '#6366f1', height: 2.5, borderRadius: '2px 2px 0 0' },
            }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.key} value={tab.key} label={tab.label} />
            ))}
          </Tabs>
        </Box>

        <Box sx={{ p: 2 }}>
          {filtered.length > 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
              {filtered.map((notification, i) => (
                <NotificationCard key={i} {...notification} />
              ))}
            </Box>
          ) : (
            <EmptyState
              icon={<NotificationsIcon />}
              title="No notifications"
              description="You're all caught up! Check back later for updates."
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Notifications;
