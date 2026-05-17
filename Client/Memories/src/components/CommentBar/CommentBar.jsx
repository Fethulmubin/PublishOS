import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  Paper,
  Divider,
  CircularProgress,
} from '@mui/material';
import { addcomment, getcomment } from '../../actions/comments';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CommentLoad from '../LoadingSkeleton/CommentLoad';
import moment from 'moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';

const commenterColors = [
  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e',
  '#f97316', '#eab308', '#22c55e', '#14b8a6',
  '#06b6d4', '#3b82f6',
];

export default function CommentBar({ setSearchParams }) {
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [commentsLoad, setCommentsLoad] = useState(false);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const comments = useSelector((state) => state.commentsReducer);
  const user = useSelector((state) => state?.auth?.authData);
  const commentRef = useRef();
  const [avatarColors, setAvatarColors] = useState({});

  useEffect(() => {
    if (searchParams.get('id')) {
      fetchComments();
    }
  }, [searchParams.get('id')]);

  const handleAddComment = async () => {
    try {
      if (comment.trim()) {
        setLoading(true);
        await dispatch(addcomment(searchParams.get('id'), comment)).then(() => {
          fetchComments();
          setComment('');
          setLoading(false);
        });
        toast.success('Comment Added Successfully');
      } else {
        toast.error('Input is empty!');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = () => {
    setCommentsLoad(true);
    dispatch(getcomment(searchParams.get('id'))).then(() => {
      setCommentsLoad(false);
    });
  };

  const fetchedComments = comments?.comments || [];

  const getAvatarColor = (name) => {
    if (!avatarColors[name]) {
      const colorIndex = (name?.length || 0) % commenterColors.length;
      setAvatarColors((prev) => ({ ...prev, [name]: commenterColors[colorIndex] }));
      return commenterColors[colorIndex];
    }
    return avatarColors[name];
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (commentRef.current && !commentRef.current.contains(e.target)) {
        const postsDiv = document.getElementById('posts');
        if (postsDiv && postsDiv.contains(e.target)) return;
        setSearchParams({});
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddComment();
    }
  };

  return (
    <Paper
      ref={commentRef}
      elevation={0}
      sx={{
        borderRadius: 3,
        border: '1px solid rgba(0,0,0,0.06)',
        overflow: 'hidden',
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.5,
          borderBottom: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>
          Comments
        </Typography>
        <IconButton
          size="small"
          onClick={() => setSearchParams({})}
          sx={{ color: '#94a3b8' }}
        >
          <CloseIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Box>

      {/* Input */}
      <Box sx={{ px: 2.5, py: 2, display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: '#6366f1',
            fontSize: '0.75rem',
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {user?.result?.name?.charAt(0)?.toUpperCase() || '?'}
        </Avatar>
        <Box sx={{ flex: 1, display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            maxRows={4}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2.5,
                backgroundColor: '#f8fafc',
                fontSize: '0.875rem',
                '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' },
                '&:hover fieldset': { borderColor: '#6366f1' },
                '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 },
              },
            }}
          />
          <IconButton
            onClick={handleAddComment}
            disabled={loading || !comment.trim()}
            sx={{
              bgcolor: comment.trim() ? '#6366f1' : '#e2e8f0',
              color: comment.trim() ? '#fff' : '#94a3b8',
              borderRadius: 2,
              width: 40,
              height: 40,
              '&:hover': { bgcolor: comment.trim() ? '#4f46e5' : '#e2e8f0' },
              '&.Mui-disabled': { bgcolor: '#e2e8f0', color: '#94a3b8' },
            }}
          >
            {loading ? (
              <CircularProgress size={16} sx={{ color: '#fff' }} />
            ) : (
              <SendIcon sx={{ fontSize: 16 }} />
            )}
          </IconButton>
        </Box>
      </Box>

      <Divider />

      {/* Comments list */}
      <Box
        sx={{
          maxHeight: 360,
          overflowY: 'auto',
          px: 2.5,
          py: 1.5,
        }}
      >
        {loading || commentsLoad ? (
          <CommentLoad />
        ) : fetchedComments.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontWeight: 500 }}>
              No comments yet. Be the first to share your thoughts!
            </Typography>
          </Box>
        ) : (
          fetchedComments.map((item, index) => {
            const isOwn = item?.userId?.name === user?.result?.name;
            return (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  mb: 2,
                  flexDirection: isOwn ? 'row-reverse' : 'row',
                }}
              >
                <Avatar
                  sx={{
                    width: 28,
                    height: 28,
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    bgcolor: getAvatarColor(item?.userId?.name),
                    flexShrink: 0,
                    mt: 0.3,
                  }}
                >
                  {item?.userId?.name?.charAt(0)?.toUpperCase()}
                </Avatar>
                <Box
                  sx={{
                    maxWidth: '75%',
                    bgcolor: isOwn ? 'rgba(99,102,241,0.08)' : '#f1f5f9',
                    borderRadius: 2.5,
                    borderBottomRightRadius: isOwn ? 0 : 2.5,
                    borderBottomLeftRadius: isOwn ? 2.5 : 0,
                    px: 2,
                    py: 1.2,
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      fontSize: '0.75rem',
                      color: isOwn ? '#6366f1' : '#475569',
                      display: 'block',
                      mb: 0.3,
                    }}
                  >
                    {isOwn ? 'You' : item?.userId?.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '0.8125rem', color: '#334155', lineHeight: 1.5 }}
                  >
                    {item?.comment}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontSize: '0.625rem',
                      color: '#94a3b8',
                      display: 'block',
                      mt: 0.5,
                      textAlign: isOwn ? 'left' : 'right',
                    }}
                  >
                    {moment(item?.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
            );
          })
        )}
      </Box>

      <ToastContainer position="top-right" autoClose={3000} />
    </Paper>
  );
}
