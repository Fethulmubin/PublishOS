import { useState, useEffect, useRef } from 'react';
import { Box, Grid } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import FeedSidebar from '../Common/FeedSidebar';
import { useSearchParams } from 'react-router-dom';
import CommentBar from '../CommentBar/CommentBar';

const Home = ({ showForm: showFormProp, setShowForm: setShowFormProp }) => {
  const [currentId, setCurrentId] = useState(null);
  const [localShowForm, setLocalShowForm] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const showForm = showFormProp !== undefined ? showFormProp : localShowForm;
  const setShowForm = setShowFormProp || setLocalShowForm;

  const isCommenting = Boolean(searchParams.get('id'));
  const commentRef = useRef();

  useEffect(() => {
    if (showForm || commentRef.current) {
      commentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isCommenting, showForm]);

  const handleNewPost = () => setShowForm(true);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        sx={{
          filter: isCommenting || showForm ? 'blur(4px)' : 'none',
          transition: 'filter 0.3s ease',
          pointerEvents: isCommenting || showForm ? 'none' : 'auto',
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
            <Posts
              setShowForm={setShowForm}
              showForm={showForm}
              currentId={currentId}
              setCurrentId={setCurrentId}
            />
          </Grid>
          <Grid item xs={12} lg={4} sx={{ display: { xs: 'none', lg: 'block' } }}>
            <Box sx={{ position: 'sticky', top: 88 }}>
              <FeedSidebar onNewPost={handleNewPost} />
            </Box>
          </Grid>
        </Grid>
      </Box>

      {isCommenting && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 1300,
            pt: { xs: 8, md: 12 },
            bgcolor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Box ref={commentRef} sx={{ width: '100%', maxWidth: 480, px: 2 }}>
            <CommentBar setSearchParams={setSearchParams} />
          </Box>
        </Box>
      )}

      {showForm && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 1300,
            pt: { xs: 6, md: 10 },
            bgcolor: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <Box ref={commentRef} sx={{ width: '100%', maxWidth: 560, px: 2 }}>
            <Form
              currentId={currentId}
              setCurrentId={setCurrentId}
              setShowForm={setShowForm}
              showForm={showForm}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default Home;
