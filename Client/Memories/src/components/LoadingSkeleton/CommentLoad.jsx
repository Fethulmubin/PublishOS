import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Box } from '@mui/material';

const CommentLoad = () => {
  return Array(4)
    .fill(0)
    .map((_, index) => (
      <Box
        key={index}
        sx={{ display: 'flex', alignItems: 'center', mb: 2, gap: 1.5 }}
      >
        <Skeleton circle height={32} width={32} />
        <Box sx={{ flex: 1 }}>
          <Skeleton width="30%" height={12} borderRadius={4} style={{ marginBottom: 6 }} />
          <Skeleton width="80%" height={10} borderRadius={4} />
        </Box>
      </Box>
    ));
};

export default CommentLoad;
