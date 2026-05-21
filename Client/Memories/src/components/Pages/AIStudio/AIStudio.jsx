import { useState, useEffect } from 'react';
import {
  Box, Typography, Grid, TextField, Button, Chip, MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import { useSelector } from 'react-redux';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import EditIcon from '@mui/icons-material/Edit';
import ArticleIcon from '@mui/icons-material/Article';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CasinoIcon from '@mui/icons-material/Casino';
import SearchIcon from '@mui/icons-material/Search';
import PsychologyIcon from '@mui/icons-material/Psychology';
import HistoryIcon from '@mui/icons-material/History';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PublicIcon from '@mui/icons-material/Public';
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import AIActionCard from '../../Common/AIActionCard';
import AIRecommendationCard from '../../Common/AIRecommendationCard';
import EmptyState from '../../Common/EmptyState';
import LinkedInPublishDialog from '../../Common/LinkedInPublishDialog';
import { generateCaption, getContentSuggestions, getAIHistory, createPosts, structureContent } from '../../../api';

const aiTools = [
  { icon: <AutoAwesomeIcon />, title: 'Generate Caption', description: 'Create engaging captions for your posts with AI-powered copywriting.', color: '#6366f1' },
  { icon: <EditIcon />, title: 'Rewrite Professionally', description: 'Polish your content with professional-grade rewriting and tone adjustment.', color: '#7c3aed' },
  { icon: <ArticleIcon />, title: 'Generate Blog', description: 'Transform ideas into full-length blog posts with structured formatting.', color: '#0ea5e9' },
  { icon: <AutorenewIcon />, title: 'Repurpose Content', description: 'Convert your content across platforms while preserving the core message.', color: '#ec4899' },
  { icon: <CasinoIcon />, title: 'Generate Hashtags', description: 'Discover trending and relevant hashtags to boost your reach.', color: '#f59e0b' },
  { icon: <SearchIcon />, title: 'Improve SEO', description: 'Optimize your content for search with keyword suggestions and analysis.', color: '#22c55e' },
];

const tones = ['Professional', 'Casual', 'Witty', 'Inspirational', 'Educational', 'Storytelling'];
const platforms = ['LinkedIn', 'Twitter', 'Instagram', 'Facebook', 'TikTok', 'Blog'];

const AIStudio = () => {
  const user = useSelector((state) => state?.auth?.authData);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [platform, setPlatform] = useState('LinkedIn');
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [historyItems, setHistoryItems] = useState([]);
  const [publishOpen, setPublishOpen] = useState(false);
  const [promptCache, setPromptCache] = useState('');

  const isGenerated = generated !== null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sugRes, histRes] = await Promise.all([
          getContentSuggestions(),
          getAIHistory().catch(() => ({ data: { data: [] } })),
        ]);
        setSuggestions(sugRes.data?.data?.suggestions || []);
        setHistoryItems(histRes.data?.data || []);
      } catch (err) {
        console.error('AI data load error:', err);
      }
    };
    fetchData();
  }, []);

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setPromptCache(topic);
    try {
      const { data } = await generateCaption({ prompt: topic, tone: tone.toLowerCase(), platform: platform.toLowerCase() });
      setTopic(data.data.caption);
      setGenerated(data.data.caption);
    } catch (err) {
      const fallback = `[Error generating content. Please try again.]`;
      setTopic(fallback);
      setGenerated(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (!promptCache) return;
    setLoading(true);
    try {
      const { data } = await generateCaption({ prompt: promptCache, tone: tone.toLowerCase(), platform: platform.toLowerCase() });
      setTopic(data.data.caption);
      setGenerated(data.data.caption);
    } catch (err) {
      const fallback = `[Error generating content. Please try again.]`;
      setTopic(fallback);
      setGenerated(fallback);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (topic) navigator.clipboard.writeText(topic);
  };

  const handlePostToPlatform = async () => {
    if (!topic) return;
    try {
      const { data: struct } = await structureContent({ content: topic, tone, platform: platform.toLowerCase() });
      await createPosts({
        title: struct.data.title || '',
        message: struct.data.message || topic,
        tags: struct.data.tags?.join(',') || '',
        creator: user?.result?.name || 'Creator',
        selectedFile: '',
      });
    } catch (err) {
      console.error('Post to platform failed:', err);
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, fontSize: '1.35rem', color: '#0f172a' }}>
          AI Studio
        </Typography>
        <Typography variant="body2" sx={{ color: '#64748b' }}>
          Supercharge your content creation with AI-powered tools
        </Typography>
      </Box>

      <Box
        sx={{
          bgcolor: '#ffffff',
          borderRadius: 3,
          border: '1px solid rgba(0,0,0,0.06)',
          p: 3,
          mb: 3,
        }}
      >
        <Typography variant="subtitle2" sx={{ fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a', mb: 2 }}>
          What do you want to create today?
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={isGenerated ? 8 : 3}
          placeholder="Describe your topic, idea, or content brief..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          variant="outlined"
          disabled={loading}
          sx={{ mb: 1.5 }}
        />
        {isGenerated && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
            <Button size="small" variant="contained" startIcon={<AutoAwesomeIcon />} onClick={handleRegenerate}
              sx={{ borderRadius: 2, fontSize: '0.75rem', px: 2, py: 0.6 }}>
              Regenerate
            </Button>
            <Button size="small" variant="outlined" startIcon={<ContentCopyIcon sx={{ fontSize: 16 }} />} onClick={handleCopy}
              sx={{ borderRadius: 2, fontSize: '0.75rem', color: '#64748b', borderColor: 'rgba(0,0,0,0.1)', px: 2, py: 0.6 }}>
              Copy
            </Button>
            <Button size="small" variant="outlined" startIcon={<LinkedInIcon sx={{ fontSize: 16 }} />} onClick={() => setPublishOpen(true)}
              sx={{ borderRadius: 2, fontSize: '0.75rem', color: '#0A66C2', borderColor: '#0A66C2', px: 2, py: 0.6 }}>
              Post to LinkedIn
            </Button>
            <Button size="small" variant="outlined" startIcon={<PublicIcon sx={{ fontSize: 16 }} />} onClick={handlePostToPlatform}
              sx={{ borderRadius: 2, fontSize: '0.75rem', color: '#6366f1', borderColor: '#6366f1', px: 2, py: 0.6 }}>
              Post to Platform
            </Button>
            <Button size="small" variant="outlined" startIcon={<EditIcon sx={{ fontSize: 16 }} />} onClick={() => setGenerated(null)}
              sx={{ borderRadius: 2, fontSize: '0.75rem', color: '#64748b', borderColor: 'rgba(0,0,0,0.1)', px: 2, py: 0.6 }}>
              New Generation
            </Button>
          </Box>
        )}
        <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'stretch', sm: 'center' }, mb: 1.5 }}>
          <FormControl size="small" fullWidth sx={{ minWidth: { xs: '100%', sm: 160 } }}>
            <InputLabel>Tone</InputLabel>
            <Select value={tone} onChange={(e) => setTone(e.target.value)} label="Tone">
              {tones.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" fullWidth sx={{ minWidth: { xs: '100%', sm: 160 } }}>
            <InputLabel>Platform</InputLabel>
            <Select value={platform} onChange={(e) => setPlatform(e.target.value)} label="Platform">
              {platforms.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>
          {!isGenerated && (
            <Button
              variant="contained"
              startIcon={<AutoAwesomeIcon />}
              onClick={() => handleGenerate()}
              disabled={!topic.trim() || loading}
              fullWidth
              sx={{ borderRadius: 2, px: 3, mt: { xs: 0.5, sm: 0 } }}
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          )}
        </Box>
        {!isGenerated && (
          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
            {['Content strategy', 'Brand building', 'Engagement tips', 'Storytelling'].map((chip) => (
              <Chip
                key={chip}
                label={chip}
                size="small"
                variant="outlined"
                onClick={() => setTopic(chip)}
                sx={{ borderRadius: 1.5, fontSize: '0.75rem', cursor: 'pointer' }}
              />
            ))}
          </Box>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ModernSectionHeader title="AI Tools" subtitle="Choose a tool to get started" />
          <Grid container spacing={1.5}>
            {aiTools.map((tool, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <AIActionCard {...tool} onClick={() => {
                  if (tool.title === 'Generate Caption') handleGenerate();
                }} />
              </Grid>
            ))}
          </Grid>

          {!isGenerated && (
          <Box sx={{ mt: 3 }}>
            <ModernSectionHeader
              title="Generated Content"
              subtitle="Enter a topic and generate to see results"
            />
            <Box
              sx={{
                bgcolor: '#ffffff',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.06)',
                minHeight: 120,
                p: 3,
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Box
                      key={i}
                      sx={{
                        height: 12,
                        borderRadius: 1,
                        bgcolor: '#f1f5f9',
                        width: `${60 + Math.random() * 40}%`,
                        animation: 'pulse 1.5s ease-in-out infinite',
                        '@keyframes pulse': { '0%, 100%': { opacity: 0.5 }, '50%': { opacity: 1 } },
                      }}
                    />
                  ))}
                </Box>
              ) : (
                <EmptyState
                  icon={<AutoAwesomeIcon />}
                  title="No content yet"
                  description="Enter a topic above and click Generate to create AI-powered content."
                />
              )}
            </Box>
          </Box>
          )}
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
              mb: 2.5,
            }}
          >
            <ModernSectionHeader
              title="AI Suggestions"
              icon={<PsychologyIcon sx={{ fontSize: 18 }} />}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {suggestions.length > 0 ? suggestions.map((s, i) => (
                <AIRecommendationCard key={i} suggestion={s.title + ': ' + s.description} actionLabel="Apply" />
              )) : (
                <EmptyState icon={<LightbulbIcon />} title="No suggestions yet" description="AI suggestions will appear here." />
              )}
            </Box>
          </Box>

          <Box
            sx={{
              bgcolor: '#ffffff',
              borderRadius: 3,
              border: '1px solid rgba(0,0,0,0.06)',
              p: 2.5,
            }}
          >
            <ModernSectionHeader
              title="Generation History"
              icon={<HistoryIcon sx={{ fontSize: 18 }} />}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {historyItems.length > 0 ? historyItems.map((item, i) => (
                <Box
                  key={item._id || i}
                  onClick={() => setTopic(item.input || item.output?.substring(0, 50))}
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    bgcolor: '#f8fafc',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' },
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ fontSize: '0.8125rem', color: '#334155', fontWeight: 500 }}
                  >
                    {item.input || item.output?.substring(0, 50) || 'AI Generation'}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                    {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Recently'}
                  </Typography>
                </Box>
              )) : (
                <EmptyState icon={<HistoryIcon />} title="No history yet" description="Your AI generations will appear here." />
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
      <LinkedInPublishDialog
        open={publishOpen}
        onClose={() => setPublishOpen(false)}
        initialContent={topic}
      />
    </Box>
  );
};

export default AIStudio;
