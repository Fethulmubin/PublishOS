import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar } from '@mui/material';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import AnalyticsCard from '../../Common/AnalyticsCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import BarChartIcon from '@mui/icons-material/BarChart';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import ShowChartIcon from '@mui/icons-material/ShowChart';

const platformData = [
  { name: 'LinkedIn', icon: <LinkedInIcon sx={{ fontSize: 18 }} />, color: '#0A66C2', reach: '142.3K', engagement: '4.2%', trend: 8.3 },
  { name: 'Twitter', icon: <TwitterIcon sx={{ fontSize: 18 }} />, color: '#1DA1F2', reach: '68.7K', engagement: '3.8%', trend: -1.2 },
  { name: 'Instagram', icon: <InstagramIcon sx={{ fontSize: 18 }} />, color: '#E4405F', reach: '34.2K', engagement: '6.1%', trend: 12.5 },
  { name: 'Facebook', icon: <FacebookIcon sx={{ fontSize: 18 }} />, color: '#1877F2', reach: '12.6K', engagement: '1.5%', trend: -3.8 },
];

const contentData = [
  { title: 'How to Build a Personal Brand in 2026', platform: 'LinkedIn', reach: '24.5K', engagement: '8.2%', type: 'Carousel' },
  { title: 'The Future of AI in Content Creation', platform: 'Twitter', reach: '18.2K', engagement: '6.7%', type: 'Thread' },
  { title: 'Behind the Scenes: Content Creation Setup', platform: 'Instagram', reach: '12.8K', engagement: '9.1%', type: 'Reel' },
  { title: '5 Lessons from Growing to 10K Followers', platform: 'LinkedIn', reach: '9.6K', engagement: '5.4%', type: 'Article' },
  { title: 'Quick Tip: Batch Create Content', platform: 'TikTok', reach: '8.3K', engagement: '7.8%', type: 'Video' },
];

const Analytics = () => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.35rem', color: '#0f172a' }}>
          Analytics
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Track your content performance and audience growth
        </Typography>
      </Box>

      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Total Reach"
            value="245.8K"
            trend={12.5}
            subtitle="+28.4K from last month"
            color="#6366f1"
            chart
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Engagement Rate"
            value="4.2%"
            trend={2.1}
            subtitle="Above industry average"
            color="#ec4899"
            chart
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Best Performing Post"
            value="24.5K"
            trend={8.2}
            subtitle="How to Build a Personal Brand"
            color="#0ea5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Audience Growth"
            value="+2.4%"
            trend={2.4}
            subtitle="+847 new followers this month"
            color="#22c55e"
            chart
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
              mb: 3,
            }}
          >
            <ModernSectionHeader
              title="Engagement Over Time"
              subtitle="Last 6 months"
              actionLabel="Download Report"
            />
            <Box
              sx={{
                height: 240,
                borderRadius: 2,
                bgcolor: 'rgba(99,102,241,0.03)',
                p: 2,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-around',
              }}
            >
              {[30, 45, 38, 55, 48, 65, 52, 70, 60, 75, 68, 82, 72, 78, 85, 74, 80, 90, 78, 88, 92, 85, 95, 88].map((h, i) => {
                const colors = ['#6366f1', '#8b5cf6', '#0ea5e9', '#ec4899'];
                return (
                  <Box key={i} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: `${h}%`,
                        borderRadius: '4px 4px 0 0',
                        background: `linear-gradient(180deg, ${colors[i % 4]}, ${colors[i % 4]}66)`,
                        transition: 'height 0.3s ease',
                        '&:hover': { opacity: 0.8 },
                      }}
                    />
                    {i % 4 === 0 && (
                      <Typography variant="caption" sx={{ fontSize: '0.6rem', color: '#94a3b8', mt: 0.5 }}>
                        {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][i / 4]}
                      </Typography>
                    )}
                  </Box>
                );
              })}
            </Box>
            <Box sx={{ display: 'flex', gap: 2, mt: 2, justifyContent: 'center' }}>
              {[
                { label: 'LinkedIn', color: '#0A66C2' },
                { label: 'Twitter', color: '#1DA1F2' },
                { label: 'Instagram', color: '#E4405F' },
                { label: 'Facebook', color: '#1877F2' },
              ].map((p) => (
                <Box key={p.label} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: p.color }} />
                  <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#64748b' }}>{p.label}</Typography>
                </Box>
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
            <ModernSectionHeader title="Content Performance" subtitle="Best performing posts" actionLabel="View All" />
            <TableContainer>
              <Table sx={{ '& .MuiTableCell-root': { borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.5 } }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Post</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Platform</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Reach</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Engagement</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Type</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contentData.map((row, i) => (
                    <TableRow key={i} sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: '0.8125rem', color: '#0f172a' }}>{row.title}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          {row.platform === 'LinkedIn' ? <LinkedInIcon sx={{ fontSize: 14, color: '#0A66C2' }} /> :
                           row.platform === 'Twitter' ? <TwitterIcon sx={{ fontSize: 14, color: '#1DA1F2' }} /> :
                           row.platform === 'Instagram' ? <InstagramIcon sx={{ fontSize: 14, color: '#E4405F' }} /> :
                           <FacebookIcon sx={{ fontSize: 14, color: '#1877F2' }} />}
                          <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#475569' }}>{row.platform}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>{row.reach}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#22c55e' }}>{row.engagement}</TableCell>
                      <TableCell>
                        <Chip label={row.type} size="small" sx={{ borderRadius: 1, fontSize: '0.6875rem', fontWeight: 600, bgcolor: 'rgba(99,102,241,0.08)', color: '#6366f1' }} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <ModernSectionHeader title="Platform Performance" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
            {platformData.map((platform, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: 2.5,
                  border: '1px solid rgba(0,0,0,0.06)',
                  p: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                  <Box sx={{ color: platform.color }}>{platform.icon}</Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>
                    {platform.name}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#94a3b8' }}>Reach</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>{platform.reach}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#94a3b8' }}>Engagement</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>{platform.engagement}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#94a3b8' }}>Trend</Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, fontSize: '0.8125rem', color: platform.trend > 0 ? '#22c55e' : '#ef4444' }}
                  >
                    {platform.trend > 0 ? '+' : ''}{platform.trend}%
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
            }}
          >
            <ModernSectionHeader title="Creator Insights" />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {[
                { icon: <ShowChartIcon sx={{ fontSize: 16 }} />, text: 'Best posting time: 10 AM - 12 PM EST', color: '#6366f1' },
                { icon: <AutoAwesomeIcon sx={{ fontSize: 16 }} />, text: 'AI-generated posts perform 23% better', color: '#7c3aed' },
                { icon: <FavoriteIcon sx={{ fontSize: 16 }} />, text: 'Video content gets 3.2x more engagement', color: '#ec4899' },
                { icon: <TrendingUpIcon sx={{ fontSize: 16 }} />, text: 'Consistent posting increased reach by 45%', color: '#22c55e' },
              ].map((insight, i) => (
                <Box key={i} sx={{ display: 'flex', gap: 1.5 }}>
                  <Box sx={{ color: insight.color, flexShrink: 0, mt: 0.25 }}>{insight.icon}</Box>
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#475569', lineHeight: 1.5 }}>
                    {insight.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics;
