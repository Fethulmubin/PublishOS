import { useState } from 'react';
import {
  Box, Typography, Grid, TextField, Button, Chip, MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
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
import ModernSectionHeader from '../../Common/ModernSectionHeader';
import AIActionCard from '../../Common/AIActionCard';
import AIRecommendationCard from '../../Common/AIRecommendationCard';
import EmptyState from '../../Common/EmptyState';

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

const historyItems = [
  'How to build a personal brand in 2026',
  '5 content marketing tips for creators',
  'The future of AI in content creation',
  'Behind the scenes: A day in my life',
];

const suggestions = [
  'Your recent LinkedIn posts about "creator economy" perform 2.5x above average. Consider expanding this topic.',
  'Shorter captions (under 100 characters) get 40% more engagement on your Instagram posts.',
  'Your audience engages most on Tuesdays at 11 AM. Schedule your next important post accordingly.',
];

const AIStudio = () => {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Professional');
  const [platform, setPlatform] = useState('LinkedIn');
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setGenerated(`Here's a ${tone.toLowerCase()} caption for ${platform} about "${topic}":

Ready to level up your content game? 🚀

After months of experimenting with different formats, here's what I've learned about ${topic.toLowerCase()}:

✨ Consistency beats perfection every time
✨ Your unique perspective is your superpower
✨ Engagement > Vanity metrics

What's your biggest takeaway from this? Drop it in the comments! 👇

#${topic.replace(/\s+/g, '')} #ContentCreation #CreatorTips`);
      setLoading(false);
    }, 1500);
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
          rows={3}
          placeholder="Describe your topic, idea, or content brief..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Tone</InputLabel>
            <Select value={tone} onChange={(e) => setTone(e.target.value)} label="Tone">
              {tones.map((t) => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Platform</InputLabel>
            <Select value={platform} onChange={(e) => setPlatform(e.target.value)} label="Platform">
              {platforms.map((p) => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            startIcon={<AutoAwesomeIcon />}
            onClick={handleGenerate}
            disabled={!topic.trim() || loading}
            sx={{ borderRadius: 2, px: 3 }}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </Box>
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
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ModernSectionHeader title="AI Tools" subtitle="Choose a tool to get started" />
          <Grid container spacing={1.5}>
            {aiTools.map((tool, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <AIActionCard {...tool} />
              </Grid>
            ))}
          </Grid>

          <Box sx={{ mt: 3 }}>
            <ModernSectionHeader
              title="Generated Content"
              subtitle={generated ? 'Your AI-generated content appears here' : 'Enter a topic and generate to see results'}
            />
            <Box
              sx={{
                bgcolor: '#ffffff',
                borderRadius: 3,
                border: '1px solid rgba(0,0,0,0.06)',
                minHeight: 200,
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
              ) : generated ? (
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1.5 }}>
                    <Button
                      size="small"
                      startIcon={<ContentCopyIcon sx={{ fontSize: 16 }} />}
                      sx={{ fontSize: '0.75rem', color: '#64748b' }}
                    >
                      Copy
                    </Button>
                  </Box>
                  <Typography
                    variant="body2"
                    sx={{ color: '#334155', fontSize: '0.875rem', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}
                  >
                    {generated}
                  </Typography>
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
              {suggestions.map((s, i) => (
                <AIRecommendationCard key={i} suggestion={s} actionLabel="Apply Suggestion" />
              ))}
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
              {historyItems.map((item, i) => (
                <Box
                  key={i}
                  onClick={() => setTopic(item)}
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
                    {item}
                  </Typography>
                  <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#94a3b8' }}>
                    {['2 hours ago', 'Yesterday', '2 days ago', '3 days ago'][i]}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AIStudio;
