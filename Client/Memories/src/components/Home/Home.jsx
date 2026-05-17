import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { getPost } from '../../actions/posts';
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost());
  }, [dispatch]);

  useEffect(() => {
    if (showForm || commentRef.current) {
      commentRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isCommenting, showForm]);

  return (
    <Box sx={{ position: 'relative' }}>
      <Box
        id="posts"
        sx={{
          filter: isCommenting || showForm ? 'blur(4px)' : 'none',
          transition: 'filter 0.3s ease',
          pointerEvents: isCommenting || showForm ? 'none' : 'auto',
        }}
      >
        <Posts
          setShowForm={setShowForm}
          showForm={showForm}
          currentId={currentId}
          setCurrentId={setCurrentId}
        />
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
              getPost={getPost}
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
