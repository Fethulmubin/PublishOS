import { Box, Typography } from '@mui/material';
import CircleIcon from '@mui/icons-material/Circle';

const NotificationCard = ({ icon, title, message, time, unread, onClick, color }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: unread ? 'rgba(99,102,241,0.03)' : 'transparent',
        border: '1px solid',
        borderColor: unread ? 'rgba(99,102,241,0.08)' : 'transparent',
        cursor: 'pointer',
        transition: 'all 0.15s ease',
        display: 'flex',
        gap: 2,
        '&:hover': {
          bgcolor: 'rgba(0,0,0,0.02)',
        },
      }}
    >
      {icon && (
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: color ? `${color}12` : 'rgba(99,102,241,0.1)',
            color: color || '#6366f1',
            flexShrink: 0,
            fontSize: '1rem',
          }}
        >
          {icon}
        </Box>
      )}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.25 }}>
          <Typography
            variant="body2"
            sx={{
              fontWeight: unread ? 600 : 500,
              fontSize: '0.8125rem',
              color: '#0f172a',
            }}
          >
            {title}
          </Typography>
          {unread && <CircleIcon sx={{ fontSize: 6, color: '#6366f1' }} />}
        </Box>
        <Typography
          variant="body2"
          sx={{ color: '#64748b', fontSize: '0.75rem', lineHeight: 1.5, mb: 0.5 }}
        >
          {message}
        </Typography>
        <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
          {time}
        </Typography>
      </Box>
    </Box>
  );
};

export default NotificationCard;
