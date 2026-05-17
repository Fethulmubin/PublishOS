import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Box } from '@mui/material';

const LoadingSkeleton = ({ cards }) => {
  return (
    <Box>
      {Array(cards)
        .fill(0)
        .map((item, index) => (
          <Box
            key={index}
            sx={{
              mb: 2.5,
              bgcolor: '#fff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
            }}
          >
            {/* Author skeleton */}
            <Box sx={{ display: 'flex', gap: 1.5, mb: 2 }}>
              <Skeleton circle width={44} height={44} />
              <Box sx={{ flex: 1 }}>
                <Skeleton width={160} height={14} borderRadius={4} />
                <Skeleton width={100} height={10} borderRadius={4} style={{ marginTop: 6 }} />
              </Box>
            </Box>
            {/* Content skeleton */}
            <Skeleton width="90%" height={12} borderRadius={4} style={{ marginBottom: 8 }} />
            <Skeleton width="60%" height={12} borderRadius={4} style={{ marginBottom: 8 }} />
            <Skeleton width="40%" height={12} borderRadius={4} style={{ marginBottom: 16 }} />
            {/* Image skeleton */}
            <Skeleton width="100%" height={220} borderRadius={12} />
          </Box>
        ))}
    </Box>
  );
};

export default LoadingSkeleton;
