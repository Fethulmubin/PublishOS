import { Box, Typography, Button, Chip, Avatar, CircularProgress } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddLinkIcon from '@mui/icons-material/AddLink';

const YouTubeStatusCard = ({ account, loading, onConnect, onDisconnect }) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  const isConnected = account?.isConnected;

  return (
    <Box
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
        <Box sx={{ color: '#FF0000', display: 'flex' }}>
          <YouTubeIcon sx={{ fontSize: 28 }} />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a' }}>
            YouTube
          </Typography>
          {isConnected ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
              {account?.profileData?.avatar && (
                <Avatar src={account.profileData.avatar} sx={{ width: 20, height: 20 }} />
              )}
              <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.75rem' }}>
                Connected as {account?.profileData?.name || account?.profileData?.username || 'YouTube Channel'}
              </Typography>
              <Chip
                icon={<CheckCircleIcon sx={{ fontSize: 14 }} />}
                label="Connected"
                size="small"
                sx={{ borderRadius: 1.5, fontWeight: 600, fontSize: '0.6875rem', bgcolor: 'rgba(34,197,94,0.1)', color: '#22c55e' }}
              />
            </Box>
          ) : (
            <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
              Not connected
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
        {isConnected ? (
          <Button
            variant="outlined"
            size="small"
            color="error"
            startIcon={<DeleteIcon />}
            onClick={onDisconnect}
            sx={{ borderRadius: 2, fontSize: '0.75rem' }}
          >
            Disconnect
          </Button>
        ) : (
          <Button
            variant="contained"
            size="small"
            startIcon={<AddLinkIcon />}
            onClick={onConnect}
            sx={{ borderRadius: 2, fontSize: '0.75rem', bgcolor: '#FF0000', '&:hover': { bgcolor: '#cc0000' } }}
          >
            Connect YouTube
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default YouTubeStatusCard;
