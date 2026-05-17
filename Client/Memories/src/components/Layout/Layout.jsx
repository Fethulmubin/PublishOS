import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import TopHeader from '../NavBar/TopHeader';

const drawerWidth = 260;

const Layout = ({ children, onNewPost }) => {
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
        <TopHeader onNewPost={onNewPost} />
        <Box
          component="main"
          sx={{
            flex: 1,
            py: 3,
            px: { xs: 2, md: 6 },
            maxWidth: 720,
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
