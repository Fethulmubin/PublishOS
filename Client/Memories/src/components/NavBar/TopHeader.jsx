import { useState } from 'react';
import { Box, Typography, Button, Avatar, IconButton, Badge, TextField, InputAdornment, Divider, List, ListItemButton, ListItemIcon, ListItemText, ClickAwayListener, Paper, Popper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import publishosLogo from '../../assets/publishos_logo.png';

const TopHeader = ({ onNewPost, pageTitle = 'Feed', onToggleMobile }) => {
  const user = useSelector((state) => state?.auth?.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profileAnchor, setProfileAnchor] = useState(null);

  const showCreateButton = pageTitle === 'Feed' || pageTitle === 'Dashboard';

  const handleProfileClick = (e) => setProfileAnchor((prev) => (prev ? null : e.currentTarget));
  const handleProfileClose = () => setProfileAnchor(null);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/auth');
  };

  const profileOpen = Boolean(profileAnchor);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1.5, md: 3 },
        py: 0,
        borderBottom: '1px solid',
        borderColor: 'rgba(0,0,0,0.06)',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        minHeight: 60,
        gap: { xs: 1, md: 2 },
      }}
    >
      {/* Left: hamburger + brand + page title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1.5 }, flexShrink: 0 }}>
        <IconButton
          onClick={onToggleMobile}
          sx={{ display: { md: 'none' }, color: '#64748b', p: 0.5 }}
          size="small"
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
          <Box component="img" src={publishosLogo} alt="PublishOS" sx={{ height: 36, display: 'block' }} />
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.1rem', color: '#0f172a', display: { xs: 'none', sm: 'block' } }}>
            PublishOS
          </Typography>
        </Box>
        <Divider orientation="vertical" flexItem sx={{ mx: { xs: 0.5, md: 1 }, display: { xs: 'none', sm: 'block' } }} />
        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#64748b', display: { xs: 'none', md: 'block' } }}>
          {pageTitle}
        </Typography>
      </Box>

      {/* Center: search */}
      <Box sx={{ flex: 1, maxWidth: 480, mx: 'auto', display: { xs: 'none', md: 'block' } }}>
        <TextField
          placeholder="Search posts, people, or topics..."
          size="small"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#94a3b8', fontSize: 18 }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: 2,
              bgcolor: '#f1f5f9',
              fontSize: '0.8125rem',
              '& fieldset': { border: 'none' },
              '&:hover': { bgcolor: '#e2e8f0' },
            },
          }}
        />
      </Box>

      {/* Right: actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, md: 1 }, flexShrink: 0 }}>
        {user ? (
          <>
            {/* Notifications */}
            <IconButton size="small" onClick={() => navigate('/notifications')} sx={{ color: '#64748b', p: { xs: 0.75, md: 1 } }}>
              <Badge badgeContent={0} color="error" sx={{ '& .MuiBadge-badge': { fontSize: 10, height: 16, minWidth: 16 } }}>
                <NotificationsOutlinedIcon sx={{ fontSize: { xs: 20, md: 22 } }} />
              </Badge>
            </IconButton>

            {/* Create Post */}
            {showCreateButton && (
              <Button
                variant="contained"
                startIcon={<AddIcon sx={{ fontSize: 16 }} />}
                onClick={onNewPost}
                size="small"
                sx={{ borderRadius: 2, px: { xs: 1, md: 2 }, py: 0.8, fontSize: { xs: '0.75rem', md: '0.8125rem' }, fontWeight: 600, whiteSpace: 'nowrap' }}
              >
                <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Create</Box>
              </Button>
            )}

            {/* Profile */}
            <ClickAwayListener onClickAway={handleProfileClose}>
              <Box>
                <Box
                  onClick={handleProfileClick}
                  sx={{ display: 'flex', alignItems: 'center', gap: 0.75, cursor: 'pointer', py: 0.5, px: 0.75, borderRadius: 2, '&:hover': { bgcolor: '#f1f5f9' } }}
                >
                  <Avatar
                    src={user?.result?.imageURL}
                    sx={{ width: 32, height: 32, fontSize: '0.8125rem', bgcolor: '#6366f1' }}
                  >
                    {user?.result?.name?.charAt(0)?.toUpperCase()}
                  </Avatar>
                  <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1e293b', display: { xs: 'none', md: 'block' }, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.result?.name || 'User'}
                  </Typography>
                </Box>
                <Popper open={profileOpen} anchorEl={profileAnchor} placement="bottom-end" sx={{ zIndex: 1300 }} disablePortal>
                  <Paper sx={{ mt: 0.5, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)', minWidth: 200, overflow: 'hidden' }}>
                    <Box sx={{ px: 2, py: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={user?.result?.imageURL} sx={{ width: 36, height: 36, bgcolor: '#6366f1' }}>
                        {user?.result?.name?.charAt(0)?.toUpperCase()}
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 700, fontSize: '0.8125rem', color: '#0f172a' }}>{user?.result?.name || 'User'}</Typography>
                        <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#64748b' }}>{user?.result?.email || ''}</Typography>
                      </Box>
                    </Box>
                    <Divider />
                    <List dense sx={{ py: 0.5 }}>
                      <ListItemButton onClick={() => { handleProfileClose(); navigate('/profile'); }} sx={{ px: 2, py: 1, borderRadius: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}><PersonIcon sx={{ fontSize: 18, color: '#64748b' }} /></ListItemIcon>
                        <ListItemText primary="Profile" primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: 500 }} />
                      </ListItemButton>
                      <ListItemButton onClick={() => { handleProfileClose(); navigate('/settings'); }} sx={{ px: 2, py: 1, borderRadius: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}><SettingsIcon sx={{ fontSize: 18, color: '#64748b' }} /></ListItemIcon>
                        <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: 500 }} />
                      </ListItemButton>
                      <Divider />
                      <ListItemButton onClick={() => { handleProfileClose(); handleLogout(); }} sx={{ px: 2, py: 1, borderRadius: 0 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}><LogoutIcon sx={{ fontSize: 18, color: '#ef4444' }} /></ListItemIcon>
                        <ListItemText primary="Sign Out" primaryTypographyProps={{ fontSize: '0.8125rem', fontWeight: 500, color: '#ef4444' }} />
                      </ListItemButton>
                    </List>
                  </Paper>
                </Popper>
              </Box>
            </ClickAwayListener>
          </>
        ) : (
          <Button variant="contained" size="small" onClick={() => navigate('/auth')} sx={{ borderRadius: 2, px: 3, py: 0.8, fontSize: '0.8125rem', fontWeight: 600 }}>
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TopHeader;
