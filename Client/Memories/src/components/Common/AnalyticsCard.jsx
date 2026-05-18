import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const AnalyticsCard = ({ title, value, subtitle, trend, chart, color = '#6366f1' }) => {
  const isPositive = trend && trend > 0;

  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.06)',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
        },
      }}
    >
      <Box sx={{ p: 2.5, pb: chart ? 1 : 2.5 }}>
        <Typography
          variant="caption"
          sx={{ fontWeight: 500, fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.03em' }}
        >
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1.5, mt: 0.5 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, fontSize: '1.75rem', color: '#0f172a' }}>
            {value}
          </Typography>
          {trend !== undefined && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              {isPositive ? (
                <TrendingUpIcon sx={{ fontSize: 16, color: '#22c55e' }} />
              ) : (
                <TrendingDownIcon sx={{ fontSize: 16, color: '#ef4444' }} />
              )}
              <Typography
                variant="caption"
                sx={{ fontWeight: 600, fontSize: '0.75rem', color: isPositive ? '#22c55e' : '#ef4444' }}
              >
                {isPositive ? '+' : ''}{trend}%
              </Typography>
            </Box>
          )}
        </Box>
        {subtitle && (
          <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem', mt: 0.5, display: 'block' }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {chart && (
        <Box sx={{ px: 2, pb: 2 }}>
          <Box
            sx={{
              height: 80,
              borderRadius: 2,
              bgcolor: `${color}06`,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-around',
              p: 1,
            }}
          >
            {[35, 55, 40, 70, 60, 85, 65, 90, 75, 80, 95, 70].map((h, i) => (
              <Box
                key={i}
                sx={{
                  width: 6,
                  height: `${h}%`,
                  borderRadius: 1,
                  bgcolor: color,
                  opacity: 0.6 + (i / 12) * 0.4,
                  transition: 'height 0.3s ease',
                }}
              />
            ))}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AnalyticsCard;
