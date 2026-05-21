import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, CircularProgress, Alert, IconButton } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { publishToLinkedIn } from '../../api';

const LinkedInPublishDialog = ({ open, onClose, initialContent, onPublished }) => {
  const [content, setContent] = useState(initialContent || '');
  const [media, setMedia] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleMediaSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMedia(file);
    const reader = new FileReader();
    reader.onload = (ev) => setMediaPreview(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handlePublish = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const payload = { content: content.trim() };
      if (mediaPreview) payload.media = mediaPreview;
      const { data } = await publishToLinkedIn(payload);
      setResult({ type: 'success', message: data.message || 'Post published to LinkedIn successfully!' });
      onPublished?.();
      setTimeout(() => { onClose(); setContent(''); setMedia(null); setMediaPreview(null); setResult(null); }, 1500);
    } catch (error) {
      setResult({ type: 'error', message: error.response?.data?.message || 'Failed to publish to LinkedIn.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) { onClose(); setMedia(null); setMediaPreview(null); setResult(null); }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box sx={{ color: '#0A66C2', display: 'flex' }}><LinkedInIcon /></Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>Publish to LinkedIn</Typography>
      </DialogTitle>
      <DialogContent>
        {result && (
          <Alert severity={result.type} sx={{ mb: 2, borderRadius: 2 }}>{result.message}</Alert>
        )}
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={6}
          placeholder="What do you want to share on LinkedIn?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ mt: 1 }}
        />
        <Typography variant="caption" sx={{ color: '#94a3b8', mt: 1, display: 'block' }}>
          {content.length} characters
        </Typography>

        {mediaPreview && (
          <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.06)', position: 'relative' }}>
            <Box component="img" src={mediaPreview} alt="Media preview" sx={{ width: '100%', maxHeight: 240, objectFit: 'cover' }} />
            <IconButton size="small" onClick={() => { setMedia(null); setMediaPreview(null); }}
              sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(0,0,0,0.5)', color: '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' } }}>
              <CloseIcon sx={{ fontSize: 16 }} />
            </IconButton>
          </Box>
        )}

        <Box sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            component="label"
            size="small"
            startIcon={<ImageOutlinedIcon sx={{ fontSize: 16 }} />}
            disabled={loading}
            sx={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 600, borderRadius: 2, px: 1.5, py: 0.6, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}
          >
            {media ? 'Change Image' : 'Add Image'}
            <input type="file" accept="image/*" hidden onChange={handleMediaSelect} />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading} sx={{ color: '#64748b' }}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handlePublish}
          disabled={!content.trim() || loading}
          startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <LinkedInIcon />}
          sx={{ bgcolor: '#0A66C2', '&:hover': { bgcolor: '#004182' } }}
        >
          {loading ? 'Publishing...' : 'Publish to LinkedIn'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LinkedInPublishDialog;
