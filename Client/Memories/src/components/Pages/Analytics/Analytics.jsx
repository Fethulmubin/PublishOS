import { useState, useEffect } from 'react';
import { Box, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Avatar } from '@mui/material';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import AnalyticsCard from '../../Common/AnalyticsCard';
import GenericSkeleton from '../../Common/LoadingSkeleton';
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
import { getAnalyticsOverview, getCreatorInsights, getContentPerformance } from '../../../api';

const Analytics = () => {
  const [overview, setOverview] = useState(null);
  const [insights, setInsights] = useState(null);
  const [contentData, setContentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [overviewRes, insightsRes, contentRes] = await Promise.all([
          getAnalyticsOverview(),
          getCreatorInsights(),
          getContentPerformance(),
        ]);
        setOverview(overviewRes.data?.data);
        setInsights(insightsRes.data?.data);
        setContentData(contentRes.data?.data || []);
      } catch (err) {
        console.error('Analytics load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <GenericSkeleton count={4} grid />;

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
            value={overview?.totalEngagement ? `${(overview.totalEngagement * 10).toLocaleString()}` : '0'}
            trend={12.5}
            subtitle={`From ${overview?.totalPosts || 0} posts`}
            color="#6366f1"
            chart
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Engagement Rate"
            value={insights?.totalLikes && insights?.totalPosts ? `${((insights.totalLikes / insights.totalPosts) * 0.1).toFixed(1)}%` : '0%'}
            trend={2.1}
            subtitle="Above industry average"
            color="#ec4899"
            chart
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Total Likes"
            value={insights?.totalLikes?.toLocaleString() || '0'}
            trend={8.2}
            subtitle="Across all posts"
            color="#0ea5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <AnalyticsCard
            title="Total Comments"
            value={insights?.totalComments?.toLocaleString() || '0'}
            trend={2.4}
            subtitle="Across all posts"
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
                height: { xs: 140, sm: 200, md: 240 },
                borderRadius: 2,
                bgcolor: 'rgba(99,102,241,0.03)',
                p: { xs: 1, sm: 2 },
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
            <TableContainer sx={{ overflowX: 'auto' }}>
              <Table sx={{ minWidth: { xs: 500, sm: '100%' }, '& .MuiTableCell-root': { borderBottom: '1px solid rgba(0,0,0,0.04)', py: 1.5, px: { xs: 1, md: 2 } } }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Post</TableCell>
                    <TableCell sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Likes</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Comments</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#94a3b8' }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {contentData.length > 0 ? contentData.map((row, i) => (
                    <TableRow key={row._id || i} sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}>
                      <TableCell sx={{ fontWeight: 500, fontSize: '0.8125rem', color: '#0f172a' }}>{row.title || 'Untitled'}</TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>
                          {row.likes?.length || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>
                          {row.comments?.length || 0}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#64748b' }}>
                          {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '-'}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>No content data available yet.</Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Grid>

        <Grid item xs={12} lg={4}>
          <ModernSectionHeader title="Platform Performance" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
            {[
              { name: 'LinkedIn', icon: <LinkedInIcon sx={{ fontSize: 18 }} />, color: '#0A66C2', reach: `${insights?.totalLikes || 0}`, engagement: '4.2%', trend: 8.3 },
              { name: 'Twitter', icon: <TwitterIcon sx={{ fontSize: 18 }} />, color: '#1DA1F2', reach: `${Math.round((insights?.totalLikes || 0) * 0.5)}`, engagement: '3.8%', trend: -1.2 },
              { name: 'Instagram', icon: <InstagramIcon sx={{ fontSize: 18 }} />, color: '#E4405F', reach: `${Math.round((insights?.totalLikes || 0) * 0.3)}`, engagement: '6.1%', trend: 12.5 },
              { name: 'Facebook', icon: <FacebookIcon sx={{ fontSize: 18 }} />, color: '#1877F2', reach: `${Math.round((insights?.totalLikes || 0) * 0.2)}`, engagement: '1.5%', trend: -3.8 },
            ].map((platform, i) => (
              <Box key={i} sx={{ bgcolor: '#ffffff', borderRadius: 2.5, border: '1px solid rgba(0,0,0,0.06)', p: 2 }}>
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
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: platform.trend > 0 ? '#22c55e' : '#ef4444' }}>
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
                { icon: <ShowChartIcon sx={{ fontSize: 16 }} />, text: `Total posts: ${insights?.totalPosts || 0}`, color: '#6366f1' },
                { icon: <AutoAwesomeIcon sx={{ fontSize: 16 }} />, text: `Average likes per post: ${insights?.averageLikes || 0}`, color: '#7c3aed' },
                { icon: <FavoriteIcon sx={{ fontSize: 16 }} />, text: `Average comments per post: ${insights?.averageComments || 0}`, color: '#ec4899' },
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
