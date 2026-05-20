import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Divider,
  Button,
  Drawer,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FeedIcon from '@mui/icons-material/RssFeed';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import memories from '../../assets/memories.png';

const drawerWidth = 260;

const navItems = [
  { label: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { label: 'Feed', icon: <FeedIcon />, path: '/' },
  { label: 'AI Studio', icon: <AutoAwesomeIcon />, path: '/ai-studio' },
  { label: 'Schedule', icon: <CalendarMonthIcon />, path: '/schedule' },
  { label: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { label: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
  { label: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { label: 'Settings', icon: <SettingsIcon />, path: '/settings' },
];

const SidebarContent = ({ onNavigate }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.authData);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  const handleNav = (path) => {
    navigate(path);
    onNavigate?.();
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/');
    onNavigate?.();
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 2.5, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box component="img" src={memories} alt="Memories" sx={{ height: 32, objectFit: 'contain' }} />
      </Box>

      <Divider />

      <Box sx={{ flex: 1, overflow: 'auto', px: 1.5, py: 1.5 }}>
        <List sx={{ py: 0 }}>
          {navItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleNav(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1.2,
                  px: 1.5,
                  backgroundColor: isActive(item.path) ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive(item.path)
                      ? 'rgba(99, 102, 241, 0.12)'
                      : 'rgba(0,0,0,0.04)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 36,
                    color: isActive(item.path) ? '#6366f1' : '#64748b',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.875rem',
                    fontWeight: isActive(item.path) ? 600 : 500,
                    color: isActive(item.path) ? '#6366f1' : '#475569',
                  }}
                />
                {item.label === 'Notifications' && (
                  <Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#ef4444' }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Divider />

      <Box sx={{ px: 2, py: 2 }}>
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Avatar
              src={user?.result?.imageURL}
              sx={{ width: 36, height: 36, fontSize: '0.875rem', bgcolor: '#6366f1' }}
            >
              {user?.result?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#1e293b' }} noWrap>
                {user?.result?.name}
              </Typography>
              <Typography variant="caption" sx={{ fontSize: '0.75rem', color: '#94a3b8' }} noWrap>
                Content Creator
              </Typography>
            </Box>
          </Box>
        ) : (
          <Button variant="contained" fullWidth onClick={() => handleNav('/auth')} sx={{ mb: 1 }}>
            Sign In
          </Button>
        )}
        {user && (
          <Button
            variant="text"
            fullWidth
            startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
            onClick={logout}
            sx={{ color: '#94a3b8', fontSize: '0.8125rem', justifyContent: 'flex-start', px: 1 }}
          >
            Logout
          </Button>
        )}
      </Box>
    </Box>
  );
};

const Sidebar = ({ mobileOpen, onClose, onOpen }) => {
  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0,0,0,0.06)',
          },
        }}
      >
        <SidebarContent onNavigate={onClose} />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid rgba(0,0,0,0.06)',
          },
        }}
        open
      >
        <SidebarContent />
      </Drawer>
    </>
  );
};

export default Sidebar;
