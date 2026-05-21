import { useState, useEffect, useRef } from 'react';
import {
  Box, Typography, TextField, Button, Paper, Avatar, Divider, IconButton, CircularProgress,
} from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloseIcon from '@mui/icons-material/Close';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ScheduleIcon from '@mui/icons-material/Schedule';
import PublicIcon from '@mui/icons-material/Public';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AIEnhanceDialog from '../Common/AIEnhanceDialog';
import SchedulePostDialog from '../Common/SchedulePostDialog';

function Form({ currentId, setCurrentId, showForm, setShowForm }) {
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const user = useSelector((state) => state?.auth?.authData);
  const form = useRef();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    creator: user?.result?.name || '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });
  const [loading, setLoading] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  useEffect(() => { if (post) setPostData(post); }, [post]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (aiOpen || scheduleOpen) return;
      if (form.current && !form.current.contains(e.target)) {
        const postsDiv = document.getElementById('posts');
        if (postsDiv && postsDiv.contains(e.target)) return;
        setShowForm(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showForm, aiOpen, scheduleOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentId) {
        await dispatch(updatePost(currentId, postData));
        toast.success('Updated Successfully');
        clear();
      } else {
        await dispatch(createPost(postData));
        toast.success('Posted Successfully');
        clear();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setPostData({ creator: user?.result?.name || '', title: '', message: '', tags: '', selectedFile: '' });
    setCurrentId(null);
    setTimeout(() => setShowForm(false), 2000);
  };

  const handleAIApply = (result) => {
    if (typeof result === 'object' && result !== null) {
      setPostData((prev) => ({ ...prev, ...result }));
    } else {
      setPostData((prev) => ({ ...prev, message: result }));
    }
  };

  if (!user) {
    return (
      <Paper sx={{ p: 4, textAlign: 'center', maxWidth: 480, mx: 'auto', borderRadius: 3 }}>
        <Typography variant="h6" sx={{ color: '#64748b', fontWeight: 500 }}>Please sign in to create content</Typography>
      </Paper>
    );
  }

  return (
    <Paper elevation={0} sx={{ borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', maxWidth: 560, mx: 'auto', maxHeight: '90vh', overflowY: 'auto' }}>
      {loading && <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress size={32} sx={{ color: '#6366f1' }} /></Box>}

      {!loading && (
        <form autoComplete="off" onSubmit={handleSubmit} ref={form}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2.5, py: 2, borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton size="small" onClick={() => setShowForm(false)} sx={{ color: '#64748b' }}><ArrowBackIcon sx={{ fontSize: 20 }} /></IconButton>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>{currentId ? 'Edit Post' : 'Create Post'}</Typography>
            </Box>
            <IconButton size="small" onClick={() => setShowForm(false)} sx={{ color: '#94a3b8' }}><CloseIcon sx={{ fontSize: 20 }} /></IconButton>
          </Box>

          {/* Creator info */}
          <Box sx={{ px: 2.5, pt: 2, pb: 1, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ width: 36, height: 36, bgcolor: '#6366f1', fontSize: '0.875rem', fontWeight: 700 }}>
              {user?.result?.name?.charAt(0)?.toUpperCase()}
            </Avatar>
            <Box>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>{user?.result?.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PublicIcon sx={{ fontSize: 12, color: '#94a3b8' }} />
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.7rem' }}>Public</Typography>
              </Box>
            </Box>
          </Box>

          {/* Title */}
          <Box sx={{ px: 2.5, pb: 1.5 }}>
            <TextField fullWidth placeholder="Post title..." variant="standard" value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
              InputProps={{ disableUnderline: true, sx: { fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', '&::placeholder': { color: '#cbd5e1', fontWeight: 600 } } }} />
          </Box>

          {/* Content */}
          <Box sx={{ px: 2.5, pb: 2 }}>
            <TextField fullWidth multiline minRows={3} placeholder="Share an insight, a story, or something your audience will love..."
              variant="outlined" value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f8fafc', borderRadius: 2.5, fontSize: '0.9375rem', lineHeight: 1.7, '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' }, '&:hover fieldset': { borderColor: '#6366f1' }, '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 } } }} />
          </Box>

          {/* Tags */}
          <Box sx={{ px: 2.5, pb: 2 }}>
            <TextField fullWidth placeholder="Add tags (comma separated)" variant="outlined" value={postData.tags}
              onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
              sx={{ '& .MuiOutlinedInput-root': { backgroundColor: '#f8fafc', borderRadius: 2.5, fontSize: '0.875rem', '& fieldset': { borderColor: 'rgba(0,0,0,0.08)' }, '&:hover fieldset': { borderColor: '#6366f1' }, '&.Mui-focused fieldset': { borderColor: '#6366f1', borderWidth: 2 } } }} />
          </Box>

          {/* Media upload preview */}
          {postData.selectedFile && (
            <Box sx={{ px: 2.5, pb: 2 }}>
              <Box sx={{ borderRadius: 2.5, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', position: 'relative' }}>
                <Box component="img" src={postData.selectedFile} alt="Preview" sx={{ width: '100%', maxHeight: 300, objectFit: 'cover' }} />
                <IconButton size="small" onClick={() => setPostData({ ...postData, selectedFile: '' })}
                  sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
                  <CloseIcon sx={{ fontSize: 16 }} />
                </IconButton>
              </Box>
            </Box>
          )}

          <Divider />

          {/* Action Buttons */}
          <Box sx={{ px: 2.5, py: 1.5, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', px: 1.5, py: 0.8, borderRadius: 2, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}>
                <ImageOutlinedIcon sx={{ fontSize: 18, color: '#6366f1' }} />
                <Typography variant="caption" sx={{ fontWeight: 500, color: '#6366f1', fontSize: '0.75rem' }}>
                  <FileBase type="file" multiple={false} onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })} />
                </Typography>
              </Box>
              <Button size="small" startIcon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />} onClick={() => setAiOpen(true)}
                sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, borderRadius: 2, px: 1.5, py: 0.8, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}>
                Generate with AI
              </Button>
              <Button size="small" startIcon={<ScheduleIcon sx={{ fontSize: 16 }} />} onClick={() => setScheduleOpen(true)}
                sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, borderRadius: 2, px: 1.5, py: 0.8, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}>
                Schedule
              </Button>
            </Box>
            <Box sx={{ flex: 1 }} />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="text" onClick={clear} sx={{ color: '#94a3b8', fontSize: '0.8125rem', fontWeight: 600 }}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={loading} sx={{ borderRadius: 2, px: 3, fontWeight: 600, fontSize: '0.8125rem' }}>
                {currentId ? 'Update' : 'Publish'}
              </Button>
            </Box>
          </Box>
        </form>
      )}

      <AIEnhanceDialog open={aiOpen} onClose={() => setAiOpen(false)} initialContent={postData.message} mode="enhance" onApply={handleAIApply} />
      <SchedulePostDialog open={scheduleOpen} onClose={() => setScheduleOpen(false)} />
      <ToastContainer position="top-right" autoClose={3000} />
    </Paper>
  );
}

export default Form;
