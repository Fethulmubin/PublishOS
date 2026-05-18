import { Box, Typography, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const AIActionCard = ({ icon, title, description, onClick, color = '#7c3aed' }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        p: 2.5,
        borderRadius: 2.5,
        bgcolor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          borderColor: color,
          boxShadow: `0 4px 16px ${color}15`,
          transform: 'translateY(-1px)',
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 3,
          height: '100%',
          bgcolor: color,
          borderRadius: '0 2px 2px 0',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box
          sx={{
            width: 42,
            height: 42,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${color}10`,
            color: color,
            flexShrink: 0,
          }}
        >
          {icon || <AutoAwesomeIcon sx={{ fontSize: 20 }} />}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle2"
            sx={{ fontWeight: 600, fontSize: '0.875rem', color: '#0f172a', mb: 0.25 }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: '#64748b', fontSize: '0.75rem', lineHeight: 1.5 }}
          >
            {description}
          </Typography>
          <Button
            size="small"
            variant="text"
            onClick={(e) => { e.stopPropagation(); onClick?.(); }}
            sx={{
              mt: 1,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: color,
              p: 0,
              minWidth: 'auto',
              '&:hover': { bgcolor: 'transparent', opacity: 0.8 },
            }}
          >
            Use Tool →
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AIActionCard;
