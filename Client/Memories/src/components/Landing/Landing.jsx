import { useState } from 'react';
import { Box, Typography, Button, Container, Grid, Chip, Avatar, Divider, TextField, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import DevicesIcon from '@mui/icons-material/Devices';
import GroupsIcon from '@mui/icons-material/Groups';
import SpeedIcon from '@mui/icons-material/Speed';
import publishosLogo from '../../assets/publishos_logo.png';

const features = [
  {
    icon: <AutoAwesomeIcon sx={{ fontSize: 28 }} />,
    title: 'AI Content Studio',
    description: 'Generate, rewrite, repurpose, and enhance your content with AI. From captions to full posts — in seconds.',
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.08)',
  },
  {
    icon: <CalendarMonthIcon sx={{ fontSize: 28 }} />,
    title: 'Smart Calendar',
    description: 'Visual calendar with drag-and-drop scheduling. See all your planned content at a glance and never miss a post.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
  },
  {
    icon: <LinkedInIcon sx={{ fontSize: 28 }} />,
    title: 'LinkedIn Publishing',
    description: 'Connect your LinkedIn account and publish posts with images directly from the platform. No more copy-pasting.',
    color: '#0A66C2',
    bg: 'rgba(10,102,194,0.08)',
  },
  {
    icon: <YouTubeIcon sx={{ fontSize: 28 }} />,
    title: 'YouTube Uploads',
    description: 'Upload videos and shorts, set titles, descriptions, tags, and visibility — all from one dashboard.',
    color: '#FF0000',
    bg: 'rgba(255,0,0,0.08)',
  },
  {
    icon: <TrendingUpIcon sx={{ fontSize: 28 }} />,
    title: 'Analytics & Insights',
    description: 'Track engagement, content performance, and YouTube-specific metrics. Data-driven decisions for better content.',
    color: '#22c55e',
    bg: 'rgba(34,197,94,0.08)',
  },
  {
    icon: <SpeedIcon sx={{ fontSize: 28 }} />,
    title: 'Lightning Fast Feed',
    description: 'Infinite-scroll feed with real-time updates. Posts load 10 at a time for a smooth, fast browsing experience.',
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.08)',
  },
];

const stats = [
  { value: '10k+', label: 'Posts Created' },
  { value: '50k+', label: 'Content Published' },
  { value: '98%', label: 'Uptime' },
  { value: '3+', label: 'Platform Integrations' },
];

const showcasePost = {
  creator: 'Sarah Chen',
  role: 'Content Creator',
  time: '2 hours ago',
  tags: ['productivity', 'AI', 'socialmedia'],
  title: 'Why we built PublishOS',
  message: 'We got tired of jumping between tools — writing in Notion, formatting in Canva, scheduling in Buffer, then manually posting to each platform. So we built one place to do it all. Create once. Publish everywhere.',
  likes: 24,
};

const showcaseScheduled = [
  { platform: 'linkedin', content: 'Excited to share our latest feature — AI-powered content rewriting! Try it now.', date: 'Jun 15, 2:00 PM', status: 'Scheduled' },
  { platform: 'youtube', content: 'New tutorial: How to automate your social media workflow in 2026', date: 'Jun 17, 10:00 AM', status: 'Scheduled' },
  { platform: 'instagram', content: 'Behind the scenes of building PublishOS 🚀', date: 'Jun 20, 9:00 AM', status: 'Draft' },
];

const platformColors = { linkedin: '#0A66C2', youtube: '#FF0000', instagram: '#E4405F', twitter: '#1DA1F2', facebook: '#1877F2' };

const Landing = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.authData);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileNavOpen(false);
  };

  const goToApp = () => navigate(user ? '/feed' : '/auth');

  return (
    <Box sx={{ bgcolor: '#f8fafc', minHeight: '100vh', color: '#1e293b', fontFamily: "'Inter', sans-serif" }}>
      {/* NAV */}
      <Box sx={{ position: 'sticky', top: 0, zIndex: 1100, bgcolor: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box component="img" src={publishosLogo} alt="PublishOS" sx={{ height: 32 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.15rem', color: '#0f172a', display: { xs: 'none', sm: 'block' } }}>PublishOS</Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
              {['Features', 'Showcase', 'Pricing'].map((item) => (
                <Typography key={item} variant="body2" onClick={() => scrollTo(item.toLowerCase())} sx={{ fontWeight: 500, color: '#64748b', cursor: 'pointer', '&:hover': { color: '#6366f1' } }}>{item}</Typography>
              ))}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              {user ? (
                <>
                  <Avatar
                    src={user?.picture || user?.imageUrl}
                    alt={user?.name}
                    onClick={() => navigate('/feed')}
                    sx={{ width: 36, height: 36, cursor: 'pointer', border: '2px solid #6366f1' }}
                  />
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#1e293b', display: { xs: 'none', sm: 'block' } }}>{user?.name}</Typography>
                  <Tooltip title="Go to Feed">
                    <Button variant="contained" size="small" onClick={() => navigate('/feed')} sx={{ borderRadius: 2, fontWeight: 600, fontSize: '0.75rem', whiteSpace: 'nowrap' }}>Dashboard</Button>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Button variant="text" onClick={() => navigate('/auth')} sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#475569', display: { xs: 'none', sm: 'inline-flex' } }}>Sign In</Button>
                  <Button variant="contained" onClick={() => navigate('/auth')} sx={{ borderRadius: 2, px: 2.5, py: 0.8, fontWeight: 600, fontSize: '0.8125rem' }}>Get Started Free</Button>
                </>
              )}
              <IconButton onClick={() => setMobileNavOpen(!mobileNavOpen)} sx={{ display: { md: 'none' }, color: '#64748b' }}>
                {mobileNavOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            </Box>
          </Box>
          {mobileNavOpen && (
            <Box sx={{ pb: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
              {['Features', 'Showcase', 'Pricing'].map((item) => (
                <Typography key={item} variant="body2" onClick={() => scrollTo(item.toLowerCase())} sx={{ fontWeight: 500, color: '#64748b', py: 0.5, cursor: 'pointer' }}>{item}</Typography>
              ))}
              {user ? (
                <Button variant="outlined" fullWidth onClick={() => navigate('/feed')} sx={{ borderRadius: 2, fontWeight: 600 }}>Dashboard</Button>
              ) : (
                <Button variant="outlined" fullWidth onClick={() => navigate('/auth')} sx={{ borderRadius: 2, fontWeight: 600 }}>Sign In</Button>
              )}
            </Box>
          )}
        </Container>
      </Box>

      {/* HERO */}
      <Box sx={{ pt: { xs: 8, md: 14 }, pb: { xs: 6, md: 10 }, textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <Container maxWidth="md">
          <Chip label="🚀 Now in Beta" size="small" sx={{ mb: 3, borderRadius: 1.5, fontWeight: 600, fontSize: '0.75rem', bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1' }} />
          <Typography variant="h2" sx={{ fontWeight: 900, fontSize: { xs: '2rem', sm: '2.75rem', md: '3.5rem' }, lineHeight: 1.15, color: '#0f172a', mb: 2 }}>
            Create once.
            <Box component="span" sx={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'block' }}>
              Publish everywhere.
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ fontSize: { xs: '1rem', md: '1.125rem' }, color: '#64748b', maxWidth: 600, mx: 'auto', mb: 4, lineHeight: 1.7 }}>
            Write once, amplify everywhere. PublishOS lets you create content, enhance it with AI, schedule it, and publish to LinkedIn, YouTube, and more — all from a single beautiful dashboard.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" size="large" onClick={goToApp} endIcon={<ArrowForwardIcon />} sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 700, fontSize: '1rem' }}>
              {user ? 'Go to Dashboard' : 'Start Creating Free'}
            </Button>
            <Button variant="outlined" size="large" onClick={() => scrollTo('features')} sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 600, fontSize: '1rem', borderColor: 'rgba(0,0,0,0.12)' }}>
              See How It Works
            </Button>
          </Box>
        </Container>
      </Box>

      {/* PLATFORM STRIP */}
      <Box sx={{ py: 4, bgcolor: '#ffffff', borderTop: '1px solid rgba(0,0,0,0.04)', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: { xs: 3, md: 6 }, flexWrap: 'wrap' }}>
            {[
              { icon: <LinkedInIcon />, label: 'LinkedIn', color: '#0A66C2' },
              { icon: <YouTubeIcon />, label: 'YouTube', color: '#FF0000' },
              { icon: <InstagramIcon />, label: 'Instagram', color: '#E4405F' },
              { icon: <TwitterIcon />, label: 'Twitter', color: '#1DA1F2' },
            ].map((p) => (
              <Box key={p.label} sx={{ display: 'flex', alignItems: 'center', gap: 1, opacity: 0.7 }}>
                <Box sx={{ color: p.color, display: 'flex' }}>{p.icon}</Box>
                <Typography variant="body2" sx={{ fontWeight: 600, color: '#475569' }}>{p.label}</Typography>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>

      {/* FEATURES */}
      <Box sx={{ py: { xs: 8, md: 12 } }} id="features">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '2.25rem' }, color: '#0f172a', mb: 1.5 }}>
              Everything you need to manage content
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1rem', maxWidth: 520, mx: 'auto' }}>
              One platform. All your channels. No more context switching.
            </Typography>
          </Box>
          <Grid container spacing={3}>
            {features.map((f) => (
              <Grid item xs={12} sm={6} md={4} key={f.title}>
                <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3, height: '100%', transition: 'all 0.2s', '&:hover': { boxShadow: '0 8px 24px rgba(0,0,0,0.06)', transform: 'translateY(-2px)' } }}>
                  <Box sx={{ width: 48, height: 48, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', color: f.color, bgcolor: f.bg, mb: 2 }}>{f.icon}</Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a', mb: 0.75 }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.875rem', lineHeight: 1.7 }}>{f.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* SHOWCASE */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#ffffff' }} id="showcase">
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '2.25rem' }, color: '#0f172a', mb: 1.5 }}>
              See it in action
            </Typography>
            <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1rem', maxWidth: 480, mx: 'auto' }}>
              Familiar components, unified experience. Here's what you'll use every day.
            </Typography>
          </Box>
          <Grid container spacing={4} alignItems="flex-start">
            {/* Post Card Showcase */}
            <Grid item xs={12} md={7}>
              <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ width: 44, height: 44, bgcolor: '#6366f1', fontSize: '1rem', fontWeight: 700 }}>S</Avatar>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>{showcasePost.creator}</Typography>
                      <Chip label="Creator" size="small" sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700, bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1' }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.75rem' }}>{showcasePost.role} · {showcasePost.time}</Typography>
                  </Box>
                </Box>
                <Box sx={{ px: 2.5, pb: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {showcasePost.tags.map((t) => (<Chip key={t} label={`#${t}`} size="small" sx={{ height: 22, fontSize: '0.6875rem', fontWeight: 500, bgcolor: 'rgba(99,102,241,0.06)', color: '#6366f1', borderRadius: 1 }} />))}
                </Box>
                <Box sx={{ px: 2.5, py: 1.5 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem', mb: 0.75 }}>{showcasePost.title}</Typography>
                  <Typography variant="body1" sx={{ color: '#334155', fontSize: '0.9375rem', lineHeight: 1.7 }}>{showcasePost.message}</Typography>
                </Box>
                <Divider sx={{ mx: 2.5 }} />
                <Box sx={{ px: 2.5, py: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ThumbUpAltIcon sx={{ fontSize: 11, color: '#fff' }} />
                    </Box>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>{showcasePost.likes}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    {[<ThumbUpAltIcon />, <ChatBubbleOutlineIcon />, <ShareOutlinedIcon />].map((icon, i) => (
                      <Button key={i} size="small" startIcon={icon} sx={{ color: '#64748b', fontSize: '0.8125rem', px: 1.5, borderRadius: 2 }}>{['Like', 'Comment', 'Share'][i]}</Button>
                    ))}
                  </Box>
                </Box>
                <Box sx={{ px: 2.5, pb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button size="small" variant="outlined" startIcon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />} sx={{ fontSize: '0.75rem', fontWeight: 600, borderRadius: 2, borderColor: 'rgba(99,102,241,0.2)', color: '#6366f1' }}>Enhance with AI</Button>
                  <Button size="small" variant="outlined" startIcon={<ScheduleIcon sx={{ fontSize: 14 }} />} sx={{ fontSize: '0.75rem', fontWeight: 600, borderRadius: 2, borderColor: 'rgba(0,0,0,0.1)', color: '#64748b' }}>Schedule</Button>
                  <Button size="small" variant="outlined" startIcon={<LinkedInIcon sx={{ fontSize: 14 }} />} sx={{ fontSize: '0.75rem', fontWeight: 600, borderRadius: 2, borderColor: 'rgba(0,0,0,0.1)', color: '#0A66C2' }}>Publish to LinkedIn</Button>
                </Box>
              </Box>
            </Grid>

            {/* Sidebar + Schedule Showcase */}
            <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Quick Actions Widget */}
              <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a', mb: 1.5 }}>Quick Actions</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
                  {[
                    { icon: <AutoAwesomeIcon sx={{ fontSize: 16 }} />, label: 'AI Studio', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
                    { icon: <ScheduleIcon sx={{ fontSize: 16 }} />, label: 'Schedule Post', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
                    { icon: <LinkedInIcon sx={{ fontSize: 16 }} />, label: 'Publish LinkedIn', color: '#0A66C2', bg: 'rgba(10,102,194,0.1)' },
                    { icon: <YouTubeIcon sx={{ fontSize: 16 }} />, label: 'Upload YouTube', color: '#FF0000', bg: 'rgba(255,0,0,0.1)' },
                  ].map((item) => (
                    <Button key={item.label} fullWidth startIcon={item.icon}
                      sx={{ justifyContent: 'flex-start', px: 1.5, py: 1, borderRadius: 2, color: item.color, bgcolor: item.bg, fontSize: '0.8125rem', fontWeight: 600, textTransform: 'none' }}>
                      {item.label}
                    </Button>
                  ))}
                </Box>
              </Box>

              {/* Scheduled Posts Widget */}
              <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a' }}>Upcoming Posts</Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem', color: '#6366f1', cursor: 'pointer' }}>View All</Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {showcaseScheduled.map((p, i) => (
                    <Box key={i} sx={{ p: 1.5, borderRadius: 2, bgcolor: '#f8fafc', border: '1px solid rgba(0,0,0,0.04)' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: platformColors[p.platform] }} />
                        <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.6875rem', color: platformColors[p.platform], textTransform: 'capitalize' }}>{p.platform}</Typography>
                        <Chip label={p.status} size="small" sx={{ height: 18, fontSize: '0.625rem', fontWeight: 600, bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1', ml: 'auto' }} />
                      </Box>
                      <Typography variant="body2" sx={{ fontSize: '0.75rem', color: '#475569', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.content}</Typography>
                      <Typography variant="caption" sx={{ fontSize: '0.625rem', color: '#94a3b8', mt: 0.5, display: 'block' }}>{p.date}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* STATS */}
      <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: '#0f172a' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((s) => (
              <Grid item xs={6} md={3} key={s.label}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h3" sx={{ fontWeight: 900, fontSize: { xs: '1.75rem', md: '2.5rem' }, color: '#ffffff', mb: 0.5 }}>{s.value}</Typography>
                  <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>{s.label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 8, md: 12 }, textAlign: 'center' }}>
        <Container maxWidth="sm">
          <Typography variant="h3" sx={{ fontWeight: 800, fontSize: { xs: '1.5rem', md: '2rem' }, color: '#0f172a', mb: 2 }}>
            Ready to simplify your workflow?
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b', fontSize: '1rem', mb: 4, lineHeight: 1.7 }}>
            Join creators who've stopped juggling tabs and started publishing from one place. Free during beta.
          </Typography>
          <Button variant="contained" size="large" onClick={goToApp} endIcon={<ArrowForwardIcon />} sx={{ borderRadius: 2, px: 5, py: 1.5, fontWeight: 700, fontSize: '1rem' }}>
            {user ? 'Go to Dashboard' : 'Get Started Free'}
          </Button>
        </Container>
      </Box>

      {/* FOOTER */}
      <Box sx={{ py: 6, borderTop: '1px solid rgba(0,0,0,0.06)', bgcolor: '#ffffff' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                <Box component="img" src={publishosLogo} alt="PublishOS" sx={{ height: 28 }} />
                <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>PublishOS</Typography>
              </Box>
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.8125rem', maxWidth: 260, lineHeight: 1.7 }}>
                Create once, publish everywhere. The all-in-one content management platform for modern creators.
              </Typography>
            </Grid>
            {[
              { title: 'Product', items: ['Features', 'Pricing', 'Changelog', 'Roadmap'] },
              { title: 'Resources', items: ['Documentation', 'API', 'Blog', 'Community'] },
              { title: 'Company', items: ['About', 'Privacy', 'Terms', 'Contact'] },
            ].map((col) => (
              <Grid item xs={4} md={2.66} key={col.title}>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a', mb: 1.5 }}>{col.title}</Typography>
                {col.items.map((item) => (
                  <Typography key={item} variant="body2" sx={{ color: '#64748b', fontSize: '0.8125rem', mb: 1, cursor: 'pointer', '&:hover': { color: '#6366f1' } }}>{item}</Typography>
                ))}
              </Grid>
            ))}
          </Grid>
          <Divider sx={{ my: 4 }} />
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem', textAlign: 'center', display: 'block' }}>
            &copy; {new Date().getFullYear()} PublishOS. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default Landing;
