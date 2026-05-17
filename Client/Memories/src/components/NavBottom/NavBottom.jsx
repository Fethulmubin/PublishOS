import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';

const NavBottom = ({ showForm, setShowForm }) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        display: { xs: 'flex', md: 'none' },
        justifyContent: 'space-around',
        alignItems: 'center',
        bgcolor: '#ffffff',
        borderTop: '1px solid rgba(0,0,0,0.06)',
        py: 0.8,
        zIndex: 1200,
      }}
    >
      {[
        { icon: <HomeIcon sx={{ fontSize: 22 }} />, label: 'Home', onClick: () => navigate('/') },
        {
          icon: <ChatBubbleOutlineIcon sx={{ fontSize: 22 }} />,
          label: 'Messages',
          onClick: () => {},
        },
        {
          icon: <AddIcon sx={{ fontSize: 28 }} />,
          label: 'Post',
          onClick: () => setShowForm(!showForm),
        },
        {
          icon: <NotificationsIcon sx={{ fontSize: 22 }} />,
          label: 'Alerts',
          onClick: () => {},
        },
      ].map((item) => (
        <Box
          key={item.label}
          onClick={item.onClick}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.3,
            cursor: 'pointer',
            px: 2,
            py: 0.5,
            borderRadius: 2,
            color: '#64748b',
            '&:hover': { bgcolor: 'rgba(99,102,241,0.06)', color: '#6366f1' },
          }}
        >
          {item.icon}
          <Typography
            variant="caption"
            sx={{ fontSize: '0.625rem', fontWeight: 600 }}
          >
            {item.label}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default NavBottom;
