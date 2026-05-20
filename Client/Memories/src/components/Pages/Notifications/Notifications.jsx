import { useState, useEffect } from 'react';
import { Box, Typography, Tabs, Tab, Chip, Button } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import PublishIcon from '@mui/icons-material/Publish';
import PeopleIcon from '@mui/icons-material/People';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import NotificationCard from '../../Common/NotificationCard';
import EmptyState from '../../Common/EmptyState';
import GenericSkeleton from '../../Common/LoadingSkeleton';
import { getNotifications, getUnreadCount, markAllNotificationsAsRead } from '../../../api';

const iconMap = {
  publishing: <CheckCircleIcon />,
  ai_suggestion: <AutoAwesomeIcon />,
  reminder: <PostAddIcon />,
  system: <NotificationsIcon />,
  engagement: <FavoriteIcon />,
  alert: <WarningIcon />,
};

const colorMap = {
  publishing: '#22c55e',
  ai_suggestion: '#7c3aed',
  reminder: '#f59e0b',
  system: '#6366f1',
  engagement: '#ef4444',
  alert: '#ef4444',
};

const tabs = [
  { label: 'All', key: 'all' },
  { label: 'Engagement', key: 'engagement' },
  { label: 'AI Suggestions', key: 'ai_suggestion' },
  { label: 'Publishing', key: 'publishing' },
  { label: 'System', key: 'system' },
];

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [notifRes, countRes] = await Promise.all([
        getNotifications(),
        getUnreadCount().catch(() => ({ data: { data: { unreadCount: 0 } } })),
      ]);
      setNotifications(notifRes.data?.data || []);
      setUnreadCount(countRes.data?.data?.unreadCount || 0);
    } catch (err) {
      console.error('Notifications load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const filtered = activeTab === 'all'
    ? notifications
    : notifications.filter((n) => n.type === activeTab);

  const handleMarkAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Mark all read error:', err);
    }
  };

  if (loading) return <GenericSkeleton count={5} />;

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
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
          {unreadCount > 0 && (
            <Chip
              label={`${unreadCount} unread`}
              size="small"
              sx={{ borderRadius: 1.5, fontWeight: 600, fontSize: '0.75rem', bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1' }}
            />
          )}
          {unreadCount > 0 && (
            <Button
              size="small"
              startIcon={<DoneAllIcon sx={{ fontSize: 16 }} />}
              onClick={handleMarkAllRead}
              sx={{ fontSize: '0.75rem', color: '#6366f1' }}
            >
              Mark all read
            </Button>
          )}
        </Box>
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
                <NotificationCard
                  key={notification._id || i}
                  icon={iconMap[notification.type] || <NotificationsIcon />}
                  color={colorMap[notification.type] || '#6366f1'}
                  title={notification.title}
                  message={notification.message}
                  time={notification.createdAt ? new Date(notification.createdAt).toLocaleDateString() : 'Recently'}
                  unread={!notification.isRead}
                />
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
