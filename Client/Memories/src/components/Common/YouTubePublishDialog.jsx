import { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, CircularProgress, Alert, IconButton, FormControl, InputLabel, Select, MenuItem, Chip, Switch, FormControlLabel } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { publishToYouTube } from '../../api';

const categoryOptions = [
  { value: '22', label: 'People & Blogs' },
  { value: '23', label: 'Comedy' },
  { value: '24', label: 'Entertainment' },
  { value: '25', label: 'News & Politics' },
  { value: '26', label: 'Howto & Style' },
  { value: '27', label: 'Education' },
  { value: '28', label: 'Science & Technology' },
  { value: '10', label: 'Music' },
  { value: '20', label: 'Gaming' },
  { value: '1', label: 'Film & Animation' },
];

const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const YouTubePublishDialog = ({ open, onClose, initialContent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [categoryId, setCategoryId] = useState('22');
  const [privacyStatus, setPrivacyStatus] = useState('private');
  const [isShort, setIsShort] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [videoBase64, setVideoBase64] = useState(null);
  const [fileSizeWarning, setFileSizeWarning] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (open) {
      setTitle(initialContent || '');
      setDescription('');
      setTags('');
      setCategoryId('22');
      setPrivacyStatus('private');
      setIsShort(false);
      setVideoFile(null);
      setVideoBase64(null);
      setFileSizeWarning('');
      setResult(null);
    }
  }, [open, initialContent]);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      setFileSizeWarning(`File is too large (${(file.size / 1024 / 1024).toFixed(1)}MB). Maximum is ${MAX_FILE_SIZE_MB}MB.`);
      setVideoFile(null);
      setVideoBase64(null);
      return;
    }

    setFileSizeWarning('');
    setVideoFile(file);

    const reader = new FileReader();
    reader.onload = (ev) => setVideoBase64(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    if (!title.trim() || !videoBase64) return;
    setLoading(true);
    setResult(null);
    try {
      const payload = {
        title: title.trim(),
        description,
        tags: tags ? tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
        categoryId,
        privacyStatus,
        videoBase64,
        mimeType: videoFile?.type || 'video/mp4',
      };
      if (isShort) {
        payload.tags.push('#Shorts');
        if (!payload.description.includes('#Shorts')) {
          payload.description = (payload.description + '\n#Shorts').trim();
        }
      }
      const { data } = await publishToYouTube(payload);
      setResult({ type: 'success', message: data.message || 'Video published to YouTube!' });
      setTimeout(() => { onClose(); }, 2000);
    } catch (error) {
      setResult({ type: 'error', message: error.response?.data?.message || 'Failed to publish to YouTube.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) { onClose(); }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box sx={{ color: '#FF0000', display: 'flex' }}><YouTubeIcon /></Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
          {isShort ? 'Publish YouTube Short' : 'Publish to YouTube'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {result && (
          <Alert severity={result.type} sx={{ mb: 2, borderRadius: 2 }}>{result.message}</Alert>
        )}
        {fileSizeWarning && (
          <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>{fileSizeWarning}</Alert>
        )}

        <TextField
          autoFocus
          fullWidth
          label="Video Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ mt: 1, mb: 2 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Tags (comma-separated)"
          placeholder="tag1, tag2, tag3"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          variant="outlined"
          disabled={loading}
          size="small"
          sx={{ mb: 2 }}
        />

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <FormControl size="small" fullWidth>
            <InputLabel>Category</InputLabel>
            <Select value={categoryId} label="Category" onChange={(e) => setCategoryId(e.target.value)} disabled={loading}>
              {categoryOptions.map((c) => (
                <MenuItem key={c.value} value={c.value}>{c.label}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" fullWidth>
            <InputLabel>Visibility</InputLabel>
            <Select value={privacyStatus} label="Visibility" onChange={(e) => setPrivacyStatus(e.target.value)} disabled={loading}>
              <MenuItem value="public">Public</MenuItem>
              <MenuItem value="unlisted">Unlisted</MenuItem>
              <MenuItem value="private">Private</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <FormControlLabel
          control={<Switch checked={isShort} onChange={(e) => setIsShort(e.target.checked)} disabled={loading} />}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem' }}>Post as YouTube Short</Typography>
              {isShort && <Chip label="#Shorts" size="small" sx={{ bgcolor: '#FF0000', color: '#fff', fontWeight: 600, fontSize: '0.625rem', height: 20 }} />}
            </Box>
          }
          sx={{ mb: 2 }}
        />

        {videoBase64 && (
          <Box sx={{ mb: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', position: 'relative', p: 2, bgcolor: '#f8fafc' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <VideocamOutlinedIcon sx={{ color: '#FF0000', fontSize: 28 }} />
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}>{videoFile?.name || 'Video selected'}</Typography>
                <Typography variant="caption" sx={{ color: '#94a3b8', fontSize: '0.75rem' }}>
                  {(videoFile ? videoFile.size / 1024 / 1024 : 0).toFixed(1)}MB
                </Typography>
              </Box>
            </Box>
            <IconButton size="small" onClick={() => { setVideoFile(null); setVideoBase64(null); setFileSizeWarning(''); }}
              sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            component="label"
            size="small"
            startIcon={<VideocamOutlinedIcon sx={{ fontSize: 16 }} />}
            disabled={loading}
            sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, borderRadius: 2, px: 1.5, py: 0.6, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}
          >
            {videoFile ? 'Change Video' : 'Select Video *'}
            <input type="file" accept="video/*" hidden onChange={handleFileSelect} />
          </Button>
          <Typography variant="caption" sx={{ color: '#94a3b8' }}>Max {MAX_FILE_SIZE_MB}MB</Typography>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading} sx={{ color: '#64748b' }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handlePublish}
          disabled={!title.trim() || !videoBase64 || loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <YouTubeIcon />}
          sx={{ bgcolor: '#FF0000', '&:hover': { bgcolor: '#cc0000' } }}
        >
          {loading ? 'Uploading...' : isShort ? 'Publish Short' : 'Publish Video'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default YouTubePublishDialog;
