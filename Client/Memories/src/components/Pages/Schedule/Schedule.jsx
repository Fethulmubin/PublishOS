import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, Chip, Snackbar, Alert } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import ScheduleCard from '../../Common/ScheduleCard';
import SchedulePostDialog from '../../Common/SchedulePostDialog';
import EmptyState from '../../Common/EmptyState';
import GenericSkeleton from '../../Common/LoadingSkeleton';
import LinkedInPublishDialog from '../../Common/LinkedInPublishDialog';
import YouTubePublishDialog from '../../Common/YouTubePublishDialog';
import { getScheduledPosts, updateScheduledPost, deleteScheduledPost } from '../../../api';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const generateCalendarDays = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  for (let i = 0; i < totalCells; i++) {
    const dayNum = i < firstDay ? daysInMonth - firstDay + i + 1 : i - firstDay + 1;
    days.push({
      day: dayNum,
      isCurrentMonth: i >= firstDay && dayNum <= daysInMonth,
      hasPosts: false,
      isToday: dayNum === now.getDate() && i >= firstDay && dayNum <= daysInMonth,
    });
  }
  return days;
};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Schedule = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  const [publishPost, setPublishPost] = useState(null);
  const [linkedInOpen, setLinkedInOpen] = useState(false);
  const [youtubePublishOpen, setYoutubePublishOpen] = useState(false);
  const [youtubePublishContent, setYoutubePublishContent] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const calendarDays = generateCalendarDays();
  const currentMonth = `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;

  const fetchData = async () => {
    try {
      const postsRes = await getScheduledPosts();
      setPosts(postsRes.data?.data || []);
    } catch (err) {
      console.error('Schedule load error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const getStatusFromBackend = (status) => {
    const map = { scheduled: 'Scheduled', published: 'Published', failed: 'Failed', draft: 'Draft' };
    return map[status] || 'Draft';
  };

  const postsByDate = posts.reduce((acc, post) => {
    if (post.scheduledAt) {
      const d = new Date(post.scheduledAt);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      if (!acc[key]) acc[key] = [];
      acc[key].push(post);
    }
    return acc;
  }, {});

  const handlePublishNow = (post) => {
    const platform = post.platforms?.[0] || 'linkedin';
    if (platform === 'youtube') {
      setYoutubePublishContent(post.content || '');
      setYoutubePublishOpen(true);
    } else {
      setPublishPost(post);
      setLinkedInOpen(true);
    }
  };

  const handleEdit = (post) => {
    setEditPost(post);
    setScheduleDialogOpen(true);
  };

  const handleDelete = async (post) => {
    try {
      await deleteScheduledPost(post._id);
      setSnackbar({ open: true, message: 'Scheduled post deleted.', severity: 'success' });
      fetchData();
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to delete post.', severity: 'error' });
    }
  };

  const handlePublished = async () => {
    if (publishPost) {
      try {
        await updateScheduledPost(publishPost._id, { status: 'published', publishedAt: new Date() });
        setSnackbar({ open: true, message: 'Post published and schedule updated!', severity: 'success' });
        fetchData();
      } catch (err) {
        console.error('Failed to update schedule status:', err);
      }
    }
    setPublishPost(null);
  };

  const handleScheduleDialogClose = () => {
    setScheduleDialogOpen(false);
    setEditPost(null);
  };

  const handleDayClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) {
      const newDate = new Date(currentDate);
      if (day > 15) newDate.setMonth(newDate.getMonth() - 1);
      else newDate.setMonth(newDate.getMonth() + 1);
      setCurrentDate(newDate);
      return;
    }
    const now = currentDate;
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDay(selectedDay === key ? null : key);
  };

  const getDayPostCount = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return 0;
    const now = currentDate;
    const key = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return postsByDate[key]?.length || 0;
  };

  const selectedPosts = selectedDay ? postsByDate[selectedDay] || [] : posts;

  if (loading) return <GenericSkeleton count={3} />;

  return (
    <Box>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, justifyContent: 'space-between', mb: 3, gap: { xs: 1.5, sm: 0 } }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, fontSize: { xs: '1.15rem', sm: '1.35rem' }, color: '#0f172a' }}>
            Schedule
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
            Plan and manage your content calendar
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setScheduleDialogOpen(true)}
          fullWidth sx={{ borderRadius: 2, px: 3, maxWidth: { sm: 180 } }}>
          Schedule Post
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: { xs: 1.5, sm: 3 }, py: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: { xs: '0.8125rem', sm: '0.9375rem' }, color: '#0f172a' }}>
                  {currentMonth}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Button size="small" variant="text" sx={{ minWidth: 28, p: 0.25, color: '#64748b' }} onClick={() => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)); setSelectedDay(null); }}><ChevronLeftIcon fontSize="small" /></Button>
                <Button size="small" variant="text" sx={{ minWidth: 28, p: 0.25, color: '#64748b' }} onClick={() => { setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)); setSelectedDay(null); }}><ChevronRightIcon fontSize="small" /></Button>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {weekDays.map((day) => (
                <Box key={day} sx={{ py: 1.5, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem', color: '#94a3b8' }}>{day}</Typography>
                </Box>
              ))}
              {calendarDays.map((d, i) => {
                const count = getDayPostCount(d.day, d.isCurrentMonth);
                const now = currentDate;
                const dayKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(d.day).padStart(2, '0')}`;
                const isSelected = d.isCurrentMonth && selectedDay === dayKey;
                return (
                  <Box key={i} onClick={() => handleDayClick(d.day, d.isCurrentMonth)} sx={{
                    py: 1, textAlign: 'center', borderBottom: '1px solid rgba(0,0,0,0.04)',
                    bgcolor: isSelected ? 'rgba(99,102,241,0.08)' : d.isToday ? 'rgba(99,102,241,0.06)' : 'transparent',
                    opacity: d.isCurrentMonth ? 1 : 0.3, cursor: 'pointer', position: 'relative',
                    '&:hover': { bgcolor: 'rgba(99,102,241,0.04)' },
                  }}>
                    <Typography variant="body2" sx={{
                      fontWeight: d.isToday ? 700 : 500, fontSize: { xs: '0.7rem', sm: '0.8125rem' },
                      color: d.isToday ? '#ffffff' : '#334155', width: { xs: 26, sm: 32 }, height: { xs: 26, sm: 32 },
                      display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', borderRadius: '50%',
                      bgcolor: d.isToday ? '#6366f1' : 'transparent',
                    }}>{d.day}</Typography>
                    {count > 0 && (
                      <Box sx={{ position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 0.5 }}>
                        {Array.from({ length: Math.min(count, 3) }).map((_, ci) => (
                          <Box key={ci} sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#6366f1' }} />
                        ))}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={5}>
          <ModernSectionHeader title={selectedDay ? `Posts for ${selectedDay}` : 'Upcoming Posts'} actionLabel={posts.length > 0 ? 'View All' : ''} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {selectedPosts.length > 0 ? selectedPosts.slice(0, 10).map((post, i) => (
              <ScheduleCard
                key={post._id || i}
                content={post.content}
                platform={post.platforms?.[0] || 'linkedin'}
                dateTime={post.scheduledAt ? new Date(post.scheduledAt).toLocaleString() : 'TBD'}
                status={getStatusFromBackend(post.status)}
                onPublish={() => handlePublishNow(post)}
                onEdit={() => handleEdit(post)}
                onDelete={() => handleDelete(post)}
              />
            )) : (
              <EmptyState icon={<CalendarMonthIcon />} title={selectedDay ? 'No posts this day' : 'No scheduled posts'} description={selectedDay ? 'Click another date or schedule a new post.' : "Click 'Schedule Post' to plan your content."} />
            )}
          </Box>
        </Grid>
      </Grid>

      <SchedulePostDialog open={scheduleDialogOpen} onClose={handleScheduleDialogClose} onCreated={fetchData} editPost={editPost} />
      <YouTubePublishDialog
        open={youtubePublishOpen}
        onClose={() => { setYoutubePublishOpen(false); setYoutubePublishContent(''); }}
        initialContent={youtubePublishContent}
      />
      {publishPost && (
        <LinkedInPublishDialog
          open={linkedInOpen}
          onClose={() => { setLinkedInOpen(false); setPublishPost(null); }}
          initialContent={publishPost.content}
          onPublished={handlePublished}
        />
      )}
      <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Schedule;
