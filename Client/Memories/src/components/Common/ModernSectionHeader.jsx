import { Box, Typography, Button } from '@mui/material';

const ModernSectionHeader = ({ title, subtitle, actionLabel, onAction, icon }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        mb: 2.5,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {icon && (
          <Box sx={{ color: '#6366f1', display: 'flex', fontSize: '1.25rem' }}>
            {icon}
          </Box>
        )}
        <Box>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', lineHeight: 1.3 }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{ color: '#64748b', fontSize: '0.8125rem', mt: 0.25 }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
      {actionLabel && (
        <Button
          variant="text"
          size="small"
          onClick={onAction}
          sx={{
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: '#6366f1',
            minWidth: 'auto',
            '&:hover': { bgcolor: 'rgba(99,102,241,0.08)' },
          }}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default ModernSectionHeader;
