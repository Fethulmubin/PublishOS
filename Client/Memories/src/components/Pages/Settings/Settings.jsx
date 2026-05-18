import { useState } from 'react';
import {
  Box, Typography, Grid, TextField, Button, Switch, Select, MenuItem, FormControl, InputLabel,
  Divider, Chip, IconButton, List, ListItem, ListItemIcon, ListItemText,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PublishIcon from '@mui/icons-material/Publish';
import LinkIcon from '@mui/icons-material/Link';
import LockIcon from '@mui/icons-material/Lock';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ModernSectionHeader from '../../Common/ModernSectionHeader';

const settingsSections = [
  { id: 'account', label: 'Account', icon: <PersonIcon sx={{ fontSize: 20 }} /> },
  { id: 'appearance', label: 'Appearance', icon: <DarkModeIcon sx={{ fontSize: 20 }} /> },
  { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon sx={{ fontSize: 20 }} /> },
  { id: 'ai', label: 'AI Preferences', icon: <AutoAwesomeIcon sx={{ fontSize: 20 }} /> },
  { id: 'publishing', label: 'Publishing', icon: <PublishIcon sx={{ fontSize: 20 }} /> },
  { id: 'platforms', label: 'Connected Platforms', icon: <LinkIcon sx={{ fontSize: 20 }} /> },
  { id: 'privacy', label: 'Privacy', icon: <LockIcon sx={{ fontSize: 20 }} /> },
];

const connectedPlatforms = [
  { name: 'LinkedIn', icon: <LinkedInIcon sx={{ fontSize: 20 }} />, connected: true, handle: '@creator', color: '#0A66C2' },
  { name: 'Twitter', icon: <TwitterIcon sx={{ fontSize: 20 }} />, connected: true, handle: '@creator', color: '#1DA1F2' },
  { name: 'Instagram', icon: <InstagramIcon sx={{ fontSize: 20 }} />, connected: true, handle: '@creator.official', color: '#E4405F' },
  { name: 'YouTube', icon: <YouTubeIcon sx={{ fontSize: 20 }} />, connected: false, handle: '', color: '#FF0000' },
];

const Settings = () => {
  const [activeSection, setActiveSection] = useState('account');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    likes: true,
    comments: true,
    follows: true,
    publishing: true,
    ai_suggestions: true,
    weekly_digest: false,
  });

  const SettingSection = ({ id, children }) => (
    <Box sx={{ display: activeSection === id ? 'block' : 'none' }}>
      {children}
    </Box>
  );

  const renderContent = () => {
    return (
      <Box>
        <SettingSection id="account">
          <ModernSectionHeader title="Account Settings" subtitle="Manage your account details" />
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Full Name" defaultValue="Creator" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Email" defaultValue="creator@example.com" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Location" defaultValue="San Francisco, CA" size="small" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth label="Website" defaultValue="https://creatorhub.io" size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Bio" multiline rows={3} defaultValue="Content Creator | Helping you build your brand" size="small" />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" sx={{ borderRadius: 2 }}>Save Changes</Button>
              </Grid>
            </Grid>
          </Box>
        </SettingSection>

        <SettingSection id="appearance">
          <ModernSectionHeader title="Appearance" subtitle="Customize your interface" />
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>
                  Dark Mode
                </Typography>
                <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
                  Toggle between light and dark themes
                </Typography>
              </Box>
              <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} sx={{ '& .MuiSwitch-thumb': { bgcolor: darkMode ? '#6366f1' : '#94a3b8' } }} />
            </Box>
            <Divider sx={{ mb: 3 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a', mb: 1.5 }}>
                Font Size
              </Typography>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select defaultValue="medium">
                  <MenuItem value="small">Small</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="large">Large</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </SettingSection>

        <SettingSection id="notifications">
          <ModernSectionHeader title="Notification Preferences" subtitle="Control what you receive" />
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
            {[
              { key: 'likes', label: 'Likes & Reactions', desc: 'When someone likes your content' },
              { key: 'comments', label: 'Comments & Replies', desc: 'When someone comments on your posts' },
              { key: 'follows', label: 'New Followers', desc: 'When someone follows your profile' },
              { key: 'publishing', label: 'Publishing Updates', desc: 'When your posts are published or fail' },
              { key: 'ai_suggestions', label: 'AI Suggestions', desc: 'When AI generates new recommendations' },
              { key: 'weekly_digest', label: 'Weekly Digest', desc: 'Weekly performance summary' },
            ].map((item) => (
              <Box key={item.key} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8125rem', color: '#0f172a' }}>
                    {item.label}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                    {item.desc}
                  </Typography>
                </Box>
                <Switch
                  checked={notifications[item.key]}
                  onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                  size="small"
                  sx={{ '& .MuiSwitch-thumb': { bgcolor: notifications[item.key] ? '#6366f1' : '#94a3b8' } }}
                />
              </Box>
            ))}
          </Box>
        </SettingSection>

        <SettingSection id="ai">
          <ModernSectionHeader title="AI Preferences" subtitle="Configure your AI experience" />
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Default Tone</InputLabel>
                  <Select defaultValue="professional">
                    <MenuItem value="professional">Professional</MenuItem>
                    <MenuItem value="casual">Casual</MenuItem>
                    <MenuItem value="witty">Witty</MenuItem>
                    <MenuItem value="inspirational">Inspirational</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Default Platform</InputLabel>
                  <Select defaultValue="linkedin">
                    <MenuItem value="linkedin">LinkedIn</MenuItem>
                    <MenuItem value="twitter">Twitter</MenuItem>
                    <MenuItem value="instagram">Instagram</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Content Length</InputLabel>
                  <Select defaultValue="medium">
                    <MenuItem value="short">Short (under 100 chars)</MenuItem>
                    <MenuItem value="medium">Medium (100-300 chars)</MenuItem>
                    <MenuItem value="long">Long (300+ chars)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Hashtag Count</InputLabel>
                  <Select defaultValue={5}>
                    {[3, 5, 10, 15, 20].map((n) => (
                      <MenuItem key={n} value={n}>{n} hashtags</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a', mb: 1.5 }}>
                Auto-Generation
              </Typography>
              {[
                { label: 'Auto-suggest captions when creating posts', default: true },
                { label: 'Generate hashtags automatically', default: true },
                { label: 'SEO optimize content before publishing', default: false },
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#475569' }}>{item.label}</Typography>
                  <Switch defaultChecked={item.default} size="small" />
                </Box>
              ))}
            </Box>
          </Box>
        </SettingSection>

        <SettingSection id="publishing">
          <ModernSectionHeader title="Publishing Preferences" subtitle="Default publishing settings" />
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Default Publish Time</InputLabel>
                  <Select defaultValue="10:00">
                    <MenuItem value="08:00">8:00 AM</MenuItem>
                    <MenuItem value="09:00">9:00 AM</MenuItem>
                    <MenuItem value="10:00">10:00 AM</MenuItem>
                    <MenuItem value="12:00">12:00 PM</MenuItem>
                    <MenuItem value="14:00">2:00 PM</MenuItem>
                    <MenuItem value="17:00">5:00 PM</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Time Zone</InputLabel>
                  <Select defaultValue="est">
                    <MenuItem value="est">Eastern Time (EST)</MenuItem>
                    <MenuItem value="pst">Pacific Time (PST)</MenuItem>
                    <MenuItem value="gmt">Greenwich Mean (GMT)</MenuItem>
                    <MenuItem value="cet">Central European (CET)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Box sx={{ mt: 3 }}>
              {[
                { label: 'Auto-schedule posts at optimal times', default: true },
                { label: 'Cross-post to all connected platforms', default: false },
                { label: 'Add watermark to images', default: true },
                { label: 'Notify me before scheduled publish', default: true },
              ].map((item, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1 }}>
                  <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#475569' }}>{item.label}</Typography>
                  <Switch defaultChecked={item.default} size="small" />
                </Box>
              ))}
            </Box>
          </Box>
        </SettingSection>

        <SettingSection id="platforms">
          <ModernSectionHeader title="Connected Platforms" actionLabel="Add Platform" />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {connectedPlatforms.map((platform, i) => (
              <Box
                key={i}
                sx={{
                  bgcolor: '#ffffff',
                  borderRadius: 2.5,
                  border: '1px solid rgba(0,0,0,0.06)',
                  p: 2.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ color: platform.color }}>{platform.icon}</Box>
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>
                      {platform.name}
                    </Typography>
                    {platform.connected ? (
                      <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
                        Connected as {platform.handle}
                      </Typography>
                    ) : (
                      <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                        Not connected
                      </Typography>
                    )}
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  {platform.connected ? (
                    <>
                      <Chip
                        icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                        label="Connected"
                        size="small"
                        sx={{ borderRadius: 1.5, fontWeight: 600, fontSize: '0.6875rem', bgcolor: 'rgba(34,197,94,0.1)', color: '#22c55e' }}
                      />
                      <IconButton size="small" sx={{ color: '#94a3b8' }}>
                        <DeleteIcon sx={{ fontSize: 18 }} />
                      </IconButton>
                    </>
                  ) : (
                    <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontSize: '0.75rem' }}>
                      Connect
                    </Button>
                  )}
                </Box>
              </Box>
            ))}
          </Box>
        </SettingSection>

        <SettingSection id="privacy">
          <ModernSectionHeader title="Privacy & Data" subtitle="Manage your privacy settings" />
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
            {[
              { label: 'Show profile on search engines', default: true },
              { label: 'Make my content public by default', default: true },
              { label: 'Allow others to reshare my content', default: true },
              { label: 'Include my data in AI training', default: false },
              { label: 'Send anonymous usage data', default: false },
            ].map((item, i) => (
              <Box key={i} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 1.5, borderBottom: i < 4 ? '1px solid rgba(0,0,0,0.04)' : 'none' }}>
                <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: '#475569' }}>{item.label}</Typography>
                <Switch defaultChecked={item.default} size="small" />
              </Box>
            ))}
          </Box>
        </SettingSection>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.35rem', color: '#0f172a' }}>
          Settings
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Manage your account and preferences
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box
          sx={{
            width: 220,
            flexShrink: 0,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden',
              position: 'sticky',
              top: 80,
            }}
          >
            {settingsSections.map((section) => (
              <Box
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  px: 2,
                  py: 1.5,
                  cursor: 'pointer',
                  bgcolor: activeSection === section.id ? 'rgba(99,102,241,0.08)' : 'transparent',
                  color: activeSection === section.id ? '#6366f1' : '#475569',
                  fontWeight: activeSection === section.id ? 600 : 500,
                  fontSize: '0.8125rem',
                  borderLeft: 3,
                  borderColor: activeSection === section.id ? '#6366f1' : 'transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': { bgcolor: activeSection === section.id ? 'rgba(99,102,241,0.12)' : 'rgba(0,0,0,0.02)' },
                }}
              >
                <Box sx={{ display: 'flex', color: 'inherit' }}>{section.icon}</Box>
                {section.label}
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {settingsSections.map((section) => (
              <Chip
                key={section.id}
                label={section.label}
                icon={section.icon}
                onClick={() => setActiveSection(section.id)}
                variant={activeSection === section.id ? 'filled' : 'outlined'}
                sx={{
                  borderRadius: 1.5,
                  fontWeight: 600,
                  fontSize: '0.75rem',
                  bgcolor: activeSection === section.id ? '#6366f1' : 'transparent',
                  color: activeSection === section.id ? '#ffffff' : '#64748b',
                  '& .MuiChip-icon': { color: 'inherit' },
                }}
              />
            ))}
          </Box>
          {renderContent()}
        </Box>
      </Box>
    </Box>
  );
};

export default Settings;
