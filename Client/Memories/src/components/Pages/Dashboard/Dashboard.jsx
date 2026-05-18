import { Box, Typography, Grid, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import DashboardStatCard from '../../Common/DashboardStatCard';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import QuickActionButton from '../../Common/QuickActionButton';
import ActivityTimeline from '../../Common/ActivityTimeline';
import AIRecommendationCard from '../../Common/AIRecommendationCard';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EditIcon from '@mui/icons-material/Edit';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PostAddIcon from '@mui/icons-material/PostAdd';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import CircleIcon from '@mui/icons-material/Circle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const quickActions = [
  { icon: <EditIcon sx={{ fontSize: 20 }} />, label: 'Create Post', color: '#6366f1' },
  { icon: <AutoAwesomeIcon sx={{ fontSize: 20 }} />, label: 'Generate with AI', color: '#7c3aed' },
  { icon: <ScheduleIcon sx={{ fontSize: 20 }} />, label: 'Schedule Content', color: '#0ea5e9' },
  { icon: <LinkedInIcon sx={{ fontSize: 20 }} />, label: 'Connect LinkedIn', color: '#0A66C2' },
];

const activityEvents = [
  { icon: <FavoriteIcon sx={{ fontSize: 12 }} />, color: '#ef4444', title: 'Your post "Content Strategy Tips" hit 1,000 likes', time: '2 hours ago' },
  { icon: <PeopleIcon sx={{ fontSize: 12 }} />, color: '#6366f1', title: 'You gained 45 new followers', description: 'Following a spike from your latest LinkedIn post', time: '4 hours ago' },
  { icon: <AutoAwesomeIcon sx={{ fontSize: 12 }} />, color: '#7c3aed', title: 'AI generated 3 caption suggestions', description: 'Based on your recent content style', time: '6 hours ago' },
  { icon: <CheckCircleIcon sx={{ fontSize: 12 }} />, color: '#22c55e', title: 'Scheduled post published on Twitter', description: '"The future of creator economy" went live', time: '8 hours ago' },
  { icon: <ShowChartIcon sx={{ fontSize: 12 }} />, color: '#f59e0b', title: 'Weekly engagement report ready', description: 'Your engagement rate grew 12% this week', time: '1 day ago' },
];

const Dashboard = () => {
  const user = useSelector((state) => state?.auth?.authData);

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.35rem', color: '#0f172a' }}>
          Welcome back, {user?.result?.name?.split(' ')[0] || 'Creator'}
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b', mt: 0.25 }}>
          Here's what's happening with your content today
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { icon: <PeopleIcon />, value: '245.8K', label: 'Total Reach', trend: 12.5, color: '#6366f1' },
          { icon: <FavoriteIcon />, value: '12.4%', label: 'Engagement Rate', trend: 2.1, color: '#ec4899' },
          { icon: <CalendarMonthIcon />, value: '8', label: 'Scheduled Posts', trend: -1, color: '#0ea5e9' },
          { icon: <AutoAwesomeIcon />, value: '27', label: 'AI Generated', trend: 45, color: '#7c3aed' },
          { icon: <TrendingUpIcon />, value: '+2.4%', label: 'Followers Growth', trend: 2.4, color: '#22c55e' },
        ].map((stat, i) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={i}>
            <DashboardStatCard {...stat} />
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
              mb: 2.5,
            }}
          >
            <ModernSectionHeader
              title="Publishing Overview"
              subtitle="Last 30 days"
              actionLabel="View Report"
            />
            <Box
              sx={{
                height: 200,
                borderRadius: 2,
                bgcolor: 'rgba(99,102,241,0.04)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
                p: 2,
                position: 'relative',
              }}
            >
              {[40, 55, 45, 70, 60, 85, 65, 90, 75, 50, 95, 60, 80, 45, 70, 55, 85, 65, 90, 75, 60, 95, 70, 85, 55, 80, 65, 75, 90, 70].map((h, i) => (
                <Box
                  key={i}
                  sx={{
                    width: '2.5%',
                    height: `${h}%`,
                    borderRadius: '4px 4px 0 0',
                    background: `linear-gradient(180deg, #6366f1 ${h}%, rgba(99,102,241,0.2) 100%)`,
                    transition: 'height 0.3s ease',
                    '&:hover': { opacity: 0.8 },
                  }}
                />
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
            }}
          >
            <ModernSectionHeader title="Recent Activity" />
            <ActivityTimeline events={activityEvents} />
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
              mb: 2.5,
            }}
          >
            <ModernSectionHeader title="Quick Actions" />
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5 }}>
              {quickActions.map((action, i) => (
                <QuickActionButton key={i} {...action} />
              ))}
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
              mb: 2.5,
            }}
          >
            <ModernSectionHeader
              title="AI Recommendations"
              icon={<AutoAwesomeIcon sx={{ fontSize: 18 }} />}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <AIRecommendationCard
                suggestion="Your LinkedIn audience engages most with video content. Try creating a short-form video this week."
                actionLabel="Generate Video Script"
              />
              <AIRecommendationCard
                suggestion={'Based on your top posts, "behind the scenes" content performs 3x better. Create a BTS post.'}
                actionLabel="Create Post"
              />
              <AIRecommendationCard
                suggestion="Best time to post on Twitter for your audience is 10 AM EST. Schedule your next tweet."
                actionLabel="Schedule Now"
              />
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
            }}
          >
            <ModernSectionHeader title="Upcoming Posts" actionLabel="View All" />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { title: 'Content Marketing Tips', time: 'Tomorrow, 10:00 AM', platform: 'LinkedIn' },
                { title: 'Behind the Scenes', time: 'Wed, 2:00 PM', platform: 'Instagram' },
                { title: 'Industry News Roundup', time: 'Fri, 9:00 AM', platform: 'Twitter' },
              ].map((post, i) => (
                <Box
                  key={i}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: '#f8fafc',
                  }}
                >
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: '#6366f1',
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>
                      {post.title}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.6875rem' }}>
                      {post.time} · {post.platform}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
