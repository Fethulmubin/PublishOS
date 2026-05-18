import { Box, Typography, Button } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

const EmptyState = ({ icon, title, description, actionLabel, onAction }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 4,
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(99,102,241,0.08)',
          color: '#6366f1',
          mb: 2,
          fontSize: '1.5rem',
        }}
      >
        {icon || <InboxIcon sx={{ fontSize: 28 }} />}
      </Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: 600, fontSize: '1rem', color: '#0f172a', mb: 0.5 }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{ color: '#64748b', fontSize: '0.8125rem', mb: 2.5, maxWidth: 320, lineHeight: 1.6 }}
        >
          {description}
        </Typography>
      )}
      {actionLabel && (
        <Button
          variant="contained"
          size="small"
          onClick={onAction}
          sx={{ borderRadius: 2, px: 3, fontSize: '0.8125rem' }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
