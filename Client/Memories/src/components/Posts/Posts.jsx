import { useState, useEffect, useRef, useCallback } from 'react';
import Post from './Post/Post';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, CircularProgress } from '@mui/material';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { getPost, getMorePosts } from '../../actions/posts';

function Posts({ setCurrentId, showForm, setShowForm }) {
  const dispatch = useDispatch();
  const { posts, hasMore, currentPage } = useSelector((state) => state.posts);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const fetched = useRef(false);
  const observerRef = useRef();

  useEffect(() => {
    if (!showForm && !fetched.current) {
      fetched.current = true;
      setLoading(true);
      dispatch(getPost(1)).finally(() => setLoading(false));
    }
  }, [showForm, dispatch]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setLoadingMore(true);
          dispatch(getMorePosts(currentPage + 1)).finally(() => setLoadingMore(false));
        }
      }, { rootMargin: '200px' });
      if (node) observerRef.current.observe(node);
    },
    [loading, loadingMore, hasMore, currentPage, dispatch]
  );

  if (loading) {
    return <LoadingSkeleton cards={3} />;
  }

  if (!posts?.length) {
    return (
      <Box sx={{ textAlign: 'center', py: 8, px: 2, bgcolor: '#fff', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)' }}>
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
      {posts.map((post, index) => (
        <Box key={post._id} ref={index === posts.length - 1 ? lastPostRef : null}>
          <Post
            setShowForm={setShowForm}
            showForm={showForm}
            post={post}
            setCurrentId={setCurrentId}
          />
        </Box>
      ))}
      {loadingMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
          <CircularProgress size={24} sx={{ color: '#6366f1' }} />
        </Box>
      )}
      {!hasMore && posts.length > 0 && (
        <Typography variant="caption" sx={{ display: 'block', textAlign: 'center', color: '#94a3b8', py: 2 }}>
          You've seen all posts
        </Typography>
      )}
    </Box>
  );
}

export default Posts;
