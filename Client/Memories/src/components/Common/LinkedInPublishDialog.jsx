import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, CircularProgress, Alert } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { publishToLinkedIn } from '../../api';

const LinkedInPublishDialog = ({ open, onClose, initialContent, onPublished }) => {
  const [content, setContent] = useState(initialContent || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handlePublish = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const { data } = await publishToLinkedIn(content);
      setResult({ type: 'success', message: data.message || 'Post published to LinkedIn successfully!' });
      onPublished?.();
      setTimeout(() => { onClose(); setContent(''); setResult(null); }, 1500);
    } catch (error) {
      setResult({ type: 'error', message: error.response?.data?.message || 'Failed to publish to LinkedIn.' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) { onClose(); setResult(null); }
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
