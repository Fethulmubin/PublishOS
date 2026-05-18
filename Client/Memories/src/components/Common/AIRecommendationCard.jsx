import { Box, Typography, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const AIRecommendationCard = ({ suggestion, actionLabel = 'Apply', onAction, icon }) => {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: 'rgba(124, 58, 237, 0.04)',
        border: '1px solid rgba(124, 58, 237, 0.12)',
        transition: 'all 0.2s ease',
        '&:hover': {
          bgcolor: 'rgba(124, 58, 237, 0.06)',
          borderColor: 'rgba(124, 58, 237, 0.2)',
        },
      }}
    >
      <Box sx={{ display: 'flex', gap: 1.5 }}>
        <Box sx={{ color: '#7c3aed', flexShrink: 0, mt: 0.25 }}>
          {icon || <LightbulbIcon sx={{ fontSize: 18 }} />}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography
            variant="body2"
            sx={{ fontSize: '0.8125rem', color: '#334155', lineHeight: 1.6 }}
          >
            {suggestion}
          </Typography>
          {onAction && (
            <Button
              size="small"
              variant="text"
              onClick={onAction}
              sx={{
                mt: 0.75,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#7c3aed',
                p: 0,
                minWidth: 'auto',
                '&:hover': { bgcolor: 'transparent', opacity: 0.8 },
              }}
            >
              {actionLabel}
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AIRecommendationCard;
