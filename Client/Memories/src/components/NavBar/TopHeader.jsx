import { Box, Typography, Button, Avatar, IconButton } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';

const TopHeader = ({ onNewPost, pageTitle = 'Feed', onToggleMobile }) => {
  const user = useSelector((state) => state?.auth?.authData);
  const navigate = useNavigate();

  const showCreateButton = pageTitle === 'Feed' || pageTitle === 'Dashboard';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 1.5, md: 6 },
        py: 1.5,
        borderBottom: '1px solid',
        borderColor: 'rgba(0,0,0,0.06)',
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 1100,
        minHeight: 56,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton
          onClick={onToggleMobile}
          sx={{ display: { md: 'none' }, color: '#64748b', p: 0.5 }}
          size="small"
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#1e293b' }}
        >
          {pageTitle}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {user ? (
          <>
            {showCreateButton && (
              <Button
                variant="contained"
                startIcon={<AddIcon sx={{ fontSize: 18 }} />}
                onClick={onNewPost}
                size="small"
                sx={{ borderRadius: 2, px: { xs: 1.5, md: 2 }, py: 1, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
              >
                <Box sx={{ display: { xs: 'none', sm: 'inline' } }}>Create Post</Box>
                <Box sx={{ display: { xs: 'inline', sm: 'none' } }}>Post</Box>
              </Button>
            )}
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
