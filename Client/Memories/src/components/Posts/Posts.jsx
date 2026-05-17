import { useState, useEffect, useRef } from 'react';
import Post from './Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography } from '@mui/material';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { getPost } from '../../actions/posts';

function Posts({ setCurrentId, showForm, setShowForm }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);
  const fetched = useRef(false);

  useEffect(() => {
    if (!showForm && !fetched.current) {
      fetched.current = true;
      setLoading(true);
      dispatch(getPost()).finally(() => setLoading(false));
    }
  }, [showForm, dispatch]);

  if (loading) {
    return <LoadingSkeleton cards={3} />;
  }

  if (!posts?.length) {
    return (
      <Box
        sx={{
          textAlign: 'center',
          py: 8,
          px: 2,
          bgcolor: '#fff',
          borderRadius: 3,
          border: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#1e293b', mb: 1 }}>
          No posts yet
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Be the first to share something with your audience.
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      {posts.map((post) => (
        <Box key={post._id} sx={{ mb: 0 }}>
          <Post
            setShowForm={setShowForm}
            showForm={showForm}
            post={post}
            setCurrentId={setCurrentId}
          />
        </Box>
      ))}
    </Box>
  );
}

export default Posts;
