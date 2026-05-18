import { Box, Typography } from '@mui/material';

const QuickActionButton = ({ icon, label, onClick, color = '#6366f1' }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
        p: 2,
        borderRadius: 2.5,
        bgcolor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: color,
          bgcolor: `${color}06`,
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        },
      }}
    >
      <Box
        sx={{
          width: 44,
          height: 44,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: `${color}10`,
          color: color,
          fontSize: '1.3rem',
        }}
      >
        {icon}
      </Box>
      <Typography
        variant="caption"
        sx={{ fontWeight: 600, fontSize: '0.7rem', color: '#475569', textAlign: 'center' }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default QuickActionButton;
