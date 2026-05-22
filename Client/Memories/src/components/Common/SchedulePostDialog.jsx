import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem, Chip } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { createScheduledPost, updateScheduledPost } from '../../api';

const platforms = [
  { value: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
  { value: 'twitter', label: 'Twitter', color: '#1DA1F2' },
  { value: 'instagram', label: 'Instagram', color: '#E4405F' },
  { value: 'facebook', label: 'Facebook', color: '#1877F2' },
  { value: 'youtube', label: 'YouTube', color: '#FF0000' },
];

const SchedulePostDialog = ({ open, onClose, onCreated, initialContent, editPost }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (open && initialContent && !editPost) setContent(initialContent);
  }, [open, initialContent, editPost]);

  useEffect(() => {
    if (open && editPost) {
      setContent(editPost.content || '');
      setSelectedPlatforms(editPost.platforms || []);
      if (editPost.scheduledAt) {
        const d = new Date(editPost.scheduledAt);
        setScheduledDate(d.toISOString().split('T')[0]);
        setScheduledTime(d.toTimeString().split(' ')[0].slice(0, 5));
      }
    } else if (!open) {
      setContent('');
      setSelectedPlatforms([]);
      setScheduledDate('');
      setScheduledTime('');
      setError('');
    }
  }, [open, editPost]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform) ? prev.filter((p) => p !== platform) : [...prev, platform]
    );
  };

  const handleSchedule = async () => {
    if (!content.trim() || !scheduledDate || !scheduledTime || selectedPlatforms.length === 0) {
      setError('Please fill in all required fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const scheduledAt = new Date(`${scheduledDate}T${scheduledTime}`);
      if (editPost) {
        await updateScheduledPost(editPost._id, { content, platforms: selectedPlatforms, scheduledAt });
      } else {
        await createScheduledPost({ content, platforms: selectedPlatforms, scheduledAt });
      }
      onCreated?.();
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to schedule post.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) { onClose(); setContent(''); setSelectedPlatforms([]); setScheduledDate(''); setScheduledTime(''); setError(''); }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box sx={{ color: '#6366f1', display: 'flex' }}><CalendarMonthIcon /></Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>{editPost ? 'Edit Scheduled Post' : 'Schedule Post'}</Typography>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={4}
          placeholder="Write your post content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ mt: 1, mb: 2 }}
        />
        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a', mb: 1 }}>
          Platforms
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {platforms.map((p) => (
            <Chip
              key={p.value}
              label={p.label}
              clickable
              onClick={() => handlePlatformToggle(p.value)}
              variant={selectedPlatforms.includes(p.value) ? 'filled' : 'outlined'}
              sx={{
                borderRadius: 1.5, fontWeight: 600, fontSize: '0.75rem',
                bgcolor: selectedPlatforms.includes(p.value) ? p.color : 'transparent',
                color: selectedPlatforms.includes(p.value) ? '#fff' : p.color,
                borderColor: p.color,
                '&:hover': { opacity: 0.8 },
              }}
            />
          ))}
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="Date"
            type="date"
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            disabled={loading}
          />
          <TextField
            fullWidth
            label="Time"
            type="time"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
            disabled={loading}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading} sx={{ color: '#64748b' }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSchedule}
          disabled={!content.trim() || !scheduledDate || !scheduledTime || selectedPlatforms.length === 0 || loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <CalendarMonthIcon />}
        >
          {loading ? 'Saving...' : editPost ? 'Save Changes' : 'Schedule Post'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SchedulePostDialog;
