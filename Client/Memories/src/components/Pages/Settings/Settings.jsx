import { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, TextField, Button, Switch, Select, MenuItem, FormControl, InputLabel,
  Divider, Chip, IconButton, Alert, Snackbar, CircularProgress,
} from '@mui/material';
import { useSelector } from 'react-redux';
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
import AddLinkIcon from '@mui/icons-material/AddLink';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import LinkedInStatusCard from '../../Common/LinkedInStatusCard';
import YouTubeStatusCard from '../../Common/YouTubeStatusCard';
import GenericSkeleton from '../../Common/LoadingSkeleton';
import {
  getSettings, updateSettings, changePassword, getConnectedAccounts,
  getLinkedInAuthUrl, getYouTubeAuthUrl, disconnectPlatform,
} from '../../../api';

const settingsSections = [
  { id: 'account', label: 'Account', icon: <PersonIcon sx={{ fontSize: 20 }} /> },
  { id: 'appearance', label: 'Appearance', icon: <DarkModeIcon sx={{ fontSize: 20 }} /> },
  { id: 'notifications', label: 'Notifications', icon: <NotificationsIcon sx={{ fontSize: 20 }} /> },
  { id: 'ai', label: 'AI Preferences', icon: <AutoAwesomeIcon sx={{ fontSize: 20 }} /> },
  { id: 'publishing', label: 'Publishing', icon: <PublishIcon sx={{ fontSize: 20 }} /> },
  { id: 'platforms', label: 'Connected Platforms', icon: <LinkIcon sx={{ fontSize: 20 }} /> },
  { id: 'privacy', label: 'Privacy', icon: <LockIcon sx={{ fontSize: 20 }} /> },
];

const Settings = () => {
  const user = useSelector((state) => state?.auth?.authData);
  const [activeSection, setActiveSection] = useState('account');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  // Settings state
  const [formData, setFormData] = useState({
    name: '', email: '', location: '', website: '', bio: '',
  });
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    likes: true, comments: true, follows: true,
    publishing: true, ai_suggestions: true, weekly_digest: false,
  });

  // Integrations state
  const [accounts, setAccounts] = useState([]);
  const [linkedInLoading, setLinkedInLoading] = useState(false);
  const [youtubeLoading, setYoutubeLoading] = useState(false);

  const linkedInAccount = accounts.find((a) => a.platform === 'linkedin');
  const youtubeAccount = accounts.find((a) => a.platform === 'youtube');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [settingsRes, accountsRes] = await Promise.all([
          getSettings(),
          getConnectedAccounts().catch(() => ({ data: { data: [] } })),
        ]);
        const settings = settingsRes.data?.data;
        if (settings) {
          setFormData({
            name: settings.name || '', email: settings.email || '',
            location: settings.location || '', website: settings.website || '',
            bio: settings.bio || '',
          });
          setDarkMode(settings.theme === 'dark');
          if (settings.preferences) {
            setNotifications((prev) => ({ ...prev, ...settings.preferences }));
          }
        }
        setAccounts(accountsRes.data?.data || []);
      } catch (err) {
        console.error('Settings load error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Check OAuth callback success/error from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('linkedin') === 'connected') {
      setSnackbar({ open: true, message: 'LinkedIn connected successfully!', severity: 'success' });
      // Refresh accounts
      getConnectedAccounts().then((res) => setAccounts(res.data?.data || [])).catch(() => {});
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('linkedin') === 'error') {
      setSnackbar({ open: true, message: 'Failed to connect LinkedIn. Please try again.', severity: 'error' });
      window.history.replaceState({}, '', window.location.pathname);
    }
    if (params.get('youtube') === 'connected') {
      setSnackbar({ open: true, message: 'YouTube connected successfully!', severity: 'success' });
      getConnectedAccounts().then((res) => setAccounts(res.data?.data || [])).catch(() => {});
      window.history.replaceState({}, '', window.location.pathname);
    } else if (params.get('youtube') === 'error') {
      setSnackbar({ open: true, message: 'Failed to connect YouTube. Please try again.', severity: 'error' });
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleSaveAccount = async () => {
    setSaving(true);
    try {
      await updateSettings(formData);
      setSnackbar({ open: true, message: 'Settings saved successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to save settings.', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword) return;
    setSaving(true);
    try {
      await changePassword(passwordData);
      setSnackbar({ open: true, message: 'Password changed successfully!', severity: 'success' });
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to change password.', severity: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const handleConnectLinkedIn = async () => {
    setLinkedInLoading(true);
    try {
      const { data } = await getLinkedInAuthUrl();
      if (data?.data?.url) {
        window.location.href = data.data.url;
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to get LinkedIn auth URL.', severity: 'error' });
    } finally {
      setLinkedInLoading(false);
    }
  };

  const handleDisconnectLinkedIn = async () => {
    setLinkedInLoading(true);
    try {
      await disconnectPlatform('linkedin');
      setAccounts((prev) => prev.map((a) =>
        a.platform === 'linkedin' ? { ...a, isConnected: false, accessToken: null } : a
      ));
      setSnackbar({ open: true, message: 'LinkedIn disconnected successfully.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to disconnect LinkedIn.', severity: 'error' });
    } finally {
      setLinkedInLoading(false);
    }
  };

  const handleConnectYouTube = async () => {
    setYoutubeLoading(true);
    try {
      const { data } = await getYouTubeAuthUrl();
      if (data?.data?.url) {
        window.location.href = data.data.url;
      }
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to get YouTube auth URL.', severity: 'error' });
    } finally {
      setYoutubeLoading(false);
    }
  };

  const handleDisconnectYouTube = async () => {
    setYoutubeLoading(true);
    try {
      await disconnectPlatform('youtube');
      setAccounts((prev) => prev.map((a) =>
        a.platform === 'youtube' ? { ...a, isConnected: false, accessToken: null } : a
      ));
      setSnackbar({ open: true, message: 'YouTube disconnected successfully.', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: 'Failed to disconnect YouTube.', severity: 'error' });
    } finally {
      setYoutubeLoading(false);
    }
  };

  const handleToggleNotification = async (key, value) => {
    setNotifications((prev) => ({ ...prev, [key]: value }));
    try {
      await updateSettings({ preferences: { ...notifications, [key]: value } });
    } catch (err) {
      console.error('Failed to update notification preference:', err);
    }
  };

  const SettingSection = ({ id, children }) => (
    <Box sx={{ display: activeSection === id ? 'block' : 'none' }}>
      {children}
    </Box>
  );

  if (loading) return <GenericSkeleton count={6} />;

  const renderContent = () => (
    <Box>
      <SettingSection id="account">
        <ModernSectionHeader title="Account Settings" subtitle="Manage your account details" />
        <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Website" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} size="small" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Bio" multiline rows={3} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} size="small" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={handleSaveAccount} disabled={saving} startIcon={saving ? <CircularProgress size={16} color="inherit" /> : null} sx={{ borderRadius: 2 }}>
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 3, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a', mb: 2 }}>Change Password</Typography>
          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="Current Password" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} size="small" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth label="New Password" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} size="small" />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" onClick={handleChangePassword} disabled={!passwordData.currentPassword || !passwordData.newPassword || saving} sx={{ borderRadius: 2 }}>
                Update Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </SettingSection>

      <SettingSection id="appearance">
        <ModernSectionHeader title="Appearance" subtitle="Customize your interface" />
        <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>Dark Mode</Typography>
              <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.75rem' }}>Toggle between light and dark themes</Typography>
            </Box>
            <Switch checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} sx={{ '& .MuiSwitch-thumb': { bgcolor: darkMode ? '#6366f1' : '#94a3b8' } }} />
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a', mb: 1.5 }}>Font Size</Typography>
            <FormControl size="small" fullWidth sx={{ minWidth: { xs: '100%', sm: 200 } }}>
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
                <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.8125rem', color: '#0f172a' }}>{item.label}</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>{item.desc}</Typography>
              </Box>
              <Switch
                checked={notifications[item.key]}
                onChange={(e) => handleToggleNotification(item.key, e.target.checked)}
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
        </Box>
      </SettingSection>

      <SettingSection id="platforms">
        <ModernSectionHeader title="Connected Platforms" />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <LinkedInStatusCard
            account={linkedInAccount}
            loading={linkedInLoading}
            onConnect={handleConnectLinkedIn}
            onDisconnect={handleDisconnectLinkedIn}
          />
          <YouTubeStatusCard
            account={youtubeAccount}
            loading={youtubeLoading}
            onConnect={handleConnectYouTube}
            onDisconnect={handleDisconnectYouTube}
          />
          {['Twitter', 'Instagram'].map((name) => (
            <Box key={name} sx={{
              bgcolor: '#ffffff', borderRadius: 2.5, border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5, display: 'flex', alignItems: 'center', justifyContent: 'space-between', opacity: 0.6,
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ color: name === 'Twitter' ? '#1DA1F2' : name === 'Instagram' ? '#E4405F' : '#FF0000' }}>
                  {name === 'Twitter' ? <TwitterIcon /> : name === 'Instagram' ? <InstagramIcon /> : <YouTubeIcon />}
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>{name}</Typography>
                  <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>Coming soon</Typography>
                </Box>
              </Box>
              <Chip label="Coming Soon" size="small" sx={{ borderRadius: 1.5, fontWeight: 600, fontSize: '0.6875rem', bgcolor: 'rgba(148,163,184,0.1)', color: '#94a3b8' }} />
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

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.35rem', color: '#0f172a' }}>Settings</Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>Manage your account and preferences</Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ width: 220, flexShrink: 0, display: { xs: 'none', md: 'block' } }}>
          <Box sx={{ bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', overflow: 'hidden', position: 'sticky', top: 80 }}>
            {settingsSections.map((section) => (
              <Box
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.5, px: 2, py: 1.5, cursor: 'pointer',
                  bgcolor: activeSection === section.id ? 'rgba(99,102,241,0.08)' : 'transparent',
                  color: activeSection === section.id ? '#6366f1' : '#475569',
                  fontWeight: activeSection === section.id ? 600 : 500,
                  fontSize: '0.8125rem', borderLeft: 3,
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
                  borderRadius: 1.5, fontWeight: 600, fontSize: '0.75rem',
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

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
