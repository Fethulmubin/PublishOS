import { Box, Typography, Button, Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const TopHeader = ({ onNewPost }) => {
  const user = useSelector((state) => state?.auth?.authData);
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, md: 6 },
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'rgba(0,0,0,0.06)',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Typography
        variant="h6"
        sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b' }}
      >
        Feed
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {user ? (
          <>
            <Button
              variant="contained"
              startIcon={<AddIcon sx={{ fontSize: 18 }} />}
              onClick={onNewPost}
              size="small"
              sx={{ borderRadius: 2, px: 2, py: 1 }}
            >
              Create Post
            </Button>
            <Avatar
              src={user?.result?.imageURL}
              sx={{
                width: 34,
                height: 34,
                fontSize: '0.8125rem',
                bgcolor: '#6366f1',
                cursor: 'pointer',
                border: '2px solid transparent',
                transition: 'border-color 0.2s',
                '&:hover': { borderColor: '#6366f1' },
              }}
            >
              {user?.result?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
          </>
        ) : (
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate('/auth')}
            sx={{ borderRadius: 2, px: 3 }}
          >
            Sign In
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default TopHeader;
