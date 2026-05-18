import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import TopHeader from '../NavBar/TopHeader';

const drawerWidth = 260;

const pageConfig = {
  '/dashboard': { title: 'Dashboard', maxWidth: 1200 },
  '/ai-studio': { title: 'AI Studio', maxWidth: 1200 },
  '/schedule': { title: 'Schedule', maxWidth: 1200 },
  '/analytics': { title: 'Analytics', maxWidth: 1200 },
  '/notifications': { title: 'Notifications', maxWidth: 720 },
  '/profile': { title: 'Profile', maxWidth: 720 },
  '/settings': { title: 'Settings', maxWidth: 960 },
};

const Layout = ({ children, onNewPost }) => {
  const location = useLocation();
  const config = Object.entries(pageConfig).find(([path]) =>
    location.pathname.startsWith(path)
  )?.[1] || { title: 'Feed', maxWidth: 720 };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <Sidebar drawerWidth={drawerWidth} />

      <Box
        sx={{
          flex: 1,
          ml: { md: `${drawerWidth}px` },
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <TopHeader onNewPost={onNewPost} pageTitle={config.title} />
        <Box
          component="main"
          sx={{
            flex: 1,
            py: 3,
            px: { xs: 2, md: 6 },
            maxWidth: config.maxWidth,
            width: '100%',
            mx: 'auto',
            pb: { xs: 10, md: 3 },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
