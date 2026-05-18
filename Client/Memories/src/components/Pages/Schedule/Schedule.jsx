import { useState } from 'react';
import { Box, Typography, Grid, Button, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddIcon from '@mui/icons-material/Add';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import ScheduleCard from '../../Common/ScheduleCard';
import EmptyState from '../../Common/EmptyState';

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const scheduledPosts = [
  { content: '5 lessons from building a creator business from scratch. The biggest? Consistency beats perfection every time.', platform: 'linkedin', dateTime: 'Tomorrow at 10:00 AM', status: 'Scheduled' },
  { content: 'Behind the scenes of today\'s photoshoot 📸 Swipe to see the setup!', platform: 'instagram', dateTime: 'Wed, Jun 17 at 2:00 PM', status: 'Scheduled' },
  { content: 'Hot take: The best content strategy is the one you\'ll actually stick with. What\'s your take?', platform: 'twitter', dateTime: 'Thu, Jun 18 at 9:00 AM', status: 'Draft' },
  { content: 'How we grew from 0 to 10K followers in 3 months (full breakdown in comments)', platform: 'linkedin', dateTime: 'Fri, Jun 19 at 11:00 AM', status: 'Published' },
  { content: 'New blog post: The Complete Guide to Content Repurposing', platform: 'facebook', dateTime: 'Mon, Jun 22 at 8:00 AM', status: 'Scheduled' },
  { content: 'Quick tip: Use AI to brainstorm 10 content ideas in 2 minutes', platform: 'tiktok', dateTime: 'Tue, Jun 23 at 3:00 PM', status: 'Failed' },
];

const generateCalendarDays = () => {
  const days = [];
  for (let i = 0; i < 35; i++) {
    days.push({
      day: i < 7 ? 26 + i : i - 6,
      isCurrentMonth: i >= 4,
      hasPosts: [6, 8, 12, 15, 18, 22].includes(i),
      isToday: i === 12,
    });
  }
  return days;
};

const Schedule = () => {
  const [currentMonth] = useState('June 2026');
  const calendarDays = generateCalendarDays();

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.35rem', color: '#0f172a' }}>
            Schedule
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b' }}>
            Plan and manage your content calendar
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Schedule Post
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={7}>
          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, py: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CalendarMonthIcon sx={{ color: '#6366f1', fontSize: 20 }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>
                  {currentMonth}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                <Button size="small" variant="text" sx={{ minWidth: 32, p: 0.5, color: '#64748b' }}>
                  <ChevronLeftIcon fontSize="small" />
                </Button>
                <Button size="small" variant="text" sx={{ minWidth: 32, p: 0.5, color: '#64748b' }}>
                  <ChevronRightIcon fontSize="small" />
                </Button>
              </Box>
            </Box>

            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {weekDays.map((day) => (
                <Box
                  key={day}
                  sx={{
                    py: 1.5,
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(0,0,0,0.06)',
                  }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem', color: '#94a3b8' }}>
                    {day}
                  </Typography>
                </Box>
              ))}
              {calendarDays.map((d, i) => (
                <Box
                  key={i}
                  sx={{
                    py: 1.5,
                    textAlign: 'center',
                    borderBottom: '1px solid rgba(0,0,0,0.04)',
                    bgcolor: d.isToday ? 'rgba(99,102,241,0.06)' : 'transparent',
                    opacity: d.isCurrentMonth ? 1 : 0.3,
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'bgcolor 0.15s ease',
                    '&:hover': { bgcolor: 'rgba(99,102,241,0.04)' },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: d.isToday ? 700 : 500,
                      fontSize: '0.8125rem',
                      color: d.isToday ? '#ffffff' : '#334155',
                      width: 32,
                      height: 32,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      borderRadius: '50%',
                      bgcolor: d.isToday ? '#6366f1' : 'transparent',
                    }}
                  >
                    {d.day}
                  </Typography>
                  {d.hasPosts && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 0.3, mt: 0.3 }}>
                      <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: '#6366f1' }} />
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} lg={5}>
          <ModernSectionHeader title="Upcoming Posts" actionLabel="View All" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {scheduledPosts.map((post, i) => (
              <ScheduleCard key={i} {...post} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Schedule;
