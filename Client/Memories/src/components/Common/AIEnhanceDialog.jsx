import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography, Box, CircularProgress, Alert, Select, MenuItem, FormControl, InputLabel, Chip } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { generateCaption, rewriteContent, generateHashtags } from '../../api';
import LinkedInPublishDialog from './LinkedInPublishDialog';

const tones = ['Professional', 'Casual', 'Witty', 'Inspirational', 'Educational', 'Storytelling'];
const platforms = ['LinkedIn', 'Twitter', 'Instagram', 'Facebook'];

const AIEnhanceDialog = ({ open, onClose, initialContent, onApply, mode = 'enhance' }) => {
  const [content, setContent] = useState(initialContent || '');
  const [tone, setTone] = useState('Professional');
  const [platform, setPlatform] = useState('LinkedIn');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [resultType, setResultType] = useState(null);
  const [error, setError] = useState('');
  const [publishOpen, setPublishOpen] = useState(false);

  const handleEnhance = async () => {
    if (!content.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);
    try {
      if (mode === 'hashtags') {
        const { data } = await generateHashtags({ content, count: 5, platform: platform.toLowerCase() });
        setResult(data.data.hashtags.join(', '));
        setResultType('hashtags');
      } else if (mode === 'rewrite') {
        const { data } = await rewriteContent({ content, tone: tone.toLowerCase() });
        setResult(data.data.rewritten);
        setResultType('rewrite');
      } else {
        const { data } = await generateCaption({ prompt: content, tone: tone.toLowerCase(), platform: platform.toLowerCase() });
        setResult(data.data.caption);
        setResultType('caption');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'AI generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = () => {
    if (result) onApply?.(result, resultType);
    handleClose();
  };

  const handleClose = () => {
    if (!loading) { onClose(); setResult(null); setResultType(null); setError(''); }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pb: 1 }}>
        <Box sx={{ color: '#7c3aed', display: 'flex' }}><AutoAwesomeIcon /></Box>
        <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1rem' }}>
          {mode === 'rewrite' ? 'Rewrite with AI' : mode === 'hashtags' ? 'Generate Hashtags' : 'Enhance with AI'}
        </Typography>
      </DialogTitle>
      <DialogContent>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>}
        <TextField
          autoFocus
          fullWidth
          multiline
          rows={4}
          placeholder={mode === 'hashtags' ? 'Enter content to generate hashtags for...' : 'Enter your content to enhance...'}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ mt: 1, mb: 2 }}
        />

        {mode !== 'hashtags' && (
          <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <FormControl size="small" fullWidth>
              <InputLabel>Tone</InputLabel>
              <Select value={tone} onChange={(e) => setTone(e.target.value)} label="Tone">
                {tones.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Platform</InputLabel>
              <Select value={platform} onChange={(e) => setPlatform(e.target.value)} label="Platform">
                {platforms.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={32} sx={{ color: '#7c3aed' }} />
          </Box>
        )}

        {result && !loading && (
          <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2, mb: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.75rem', color: '#6366f1', mb: 1 }}>
              {resultType === 'hashtags' ? 'Generated Hashtags' : 'Generated Content'}
            </Typography>
            <Typography variant="body2" sx={{ color: '#334155', fontSize: '0.875rem', lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
              {result}
            </Typography>
            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
              {resultType === 'hashtags' && result.split(',').map((tag, i) => (
                <Chip key={i} label={tag.trim()} size="small" sx={{ borderRadius: 1, fontSize: '0.6875rem', bgcolor: 'rgba(99,102,241,0.08)', color: '#6366f1' }} />
              ))}
            </Box>
            {resultType !== 'hashtags' && (
              <Button
                size="small"
                variant="outlined"
                startIcon={<LinkedInIcon />}
                onClick={() => setPublishOpen(true)}
                sx={{ mt: 1.5, color: '#0A66C2', borderColor: '#0A66C2', fontSize: '0.75rem' }}
              >
                Post to LinkedIn
              </Button>
            )}
          </Box>
        )}
        <LinkedInPublishDialog
          open={publishOpen}
          onClose={() => setPublishOpen(false)}
          initialContent={resultType !== 'hashtags' ? result : ''}
        />

        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
          {['Content strategy', 'Brand building', 'Engagement tips', 'Storytelling'].map((chip) => (
            <Chip
              key={chip}
              label={chip}
              size="small"
              variant="outlined"
              onClick={() => setContent(chip)}
              sx={{ borderRadius: 1.5, fontSize: '0.6875rem', cursor: 'pointer' }}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} disabled={loading} sx={{ color: '#64748b' }}>Cancel</Button>
        {result && !loading ? (
          <Button variant="contained" onClick={handleApply} startIcon={<AutoAwesomeIcon />}
            sx={{ bgcolor: '#7c3aed', '&:hover': { bgcolor: '#6d28d9' } }}>
            Apply
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={handleEnhance}
            disabled={!content.trim() || loading}
            startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <AutoAwesomeIcon />}
            sx={{ bgcolor: '#7c3aed', '&:hover': { bgcolor: '#6d28d9' } }}
          >
            {loading ? 'Generating...' : mode === 'hashtags' ? 'Generate Hashtags' : 'Enhance'}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AIEnhanceDialog;
