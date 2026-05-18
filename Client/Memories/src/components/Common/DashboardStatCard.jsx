import { Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

const DashboardStatCard = ({ icon, value, label, trend, trendLabel, color = '#6366f1' }) => {
  const isPositive = trend && trend > 0;

  return (
    <Box
      sx={{
        bgcolor: '#ffffff',
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.06)',
        p: 2.5,
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          transform: 'translateY(-1px)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: `${color}12`,
            color: color,
            fontSize: '1.25rem',
          }}
        >
          {icon}
        </Box>
      </Box>
      <Typography
        variant="h4"
        sx={{ fontWeight: 800, fontSize: '1.5rem', color: '#0f172a', mb: 0.25 }}
      >
        {value}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: '#64748b', fontSize: '0.8125rem', fontWeight: 500, mb: 0.5 }}
      >
        {label}
      </Typography>
      {trend !== undefined && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {isPositive ? (
            <TrendingUpIcon sx={{ fontSize: 14, color: '#22c55e' }} />
          ) : (
            <TrendingDownIcon sx={{ fontSize: 14, color: '#ef4444' }} />
          )}
          <Typography
            variant="caption"
            sx={{
              fontWeight: 600,
              fontSize: '0.75rem',
              color: isPositive ? '#22c55e' : '#ef4444',
            }}
          >
            {isPositive ? '+' : ''}{trend}%
          </Typography>
          {trendLabel && (
            <Typography variant="caption" sx={{ fontSize: '0.7rem', color: '#94a3b8', ml: 0.25 }}>
              {trendLabel}
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};

export default DashboardStatCard;
