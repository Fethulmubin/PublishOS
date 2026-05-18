import { Box, Skeleton } from '@mui/material';

const variants = {
  card: (
    <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: 2 }} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="60%" height={14} sx={{ borderRadius: 1, mb: 0.5 }} />
          <Skeleton width="40%" height={12} sx={{ borderRadius: 1 }} />
        </Box>
      </Box>
      <Skeleton variant="rounded" width="100%" height={12} sx={{ borderRadius: 1, mb: 0.5 }} />
      <Skeleton variant="rounded" width="80%" height={12} sx={{ borderRadius: 1, mb: 0.5 }} />
      <Skeleton variant="rounded" width="45%" height={12} sx={{ borderRadius: 1 }} />
    </Box>
  ),
  stat: (
    <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
      <Skeleton variant="rounded" width={36} height={36} sx={{ borderRadius: 2, mb: 2 }} />
      <Skeleton width="70%" height={24} sx={{ borderRadius: 1, mb: 0.5 }} />
      <Skeleton width="50%" height={14} sx={{ borderRadius: 1 }} />
    </Box>
  ),
  chart: (
    <Box sx={{ p: 2.5, bgcolor: '#ffffff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
      <Skeleton width="40%" height={14} sx={{ borderRadius: 1, mb: 2 }} />
      <Skeleton variant="rounded" width="100%" height={120} sx={{ borderRadius: 2 }} />
    </Box>
  ),
};

const GenericSkeleton = ({ variant = 'card', count = 1, grid }) => {
  if (grid) {
    return (
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: grid },
        gap: 2,
      }}>
        {Array.from({ length: count }).map((_, i) => (
          <Box key={i}>{variants[variant] || variants.card}</Box>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Box key={i}>{variants[variant] || variants.card}</Box>
      ))}
    </Box>
  );
};

export default GenericSkeleton;
