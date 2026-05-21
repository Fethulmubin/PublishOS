import { Box, Typography, Button, Chip, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import PlatformBadge from './PlatformBadge';

const statusConfig = {
  Draft: { color: '#64748b', bg: '#64748b10', label: 'Draft' },
  Scheduled: { color: '#6366f1', bg: '#6366f110', label: 'Scheduled' },
  Published: { color: '#22c55e', bg: '#22c55e10', label: 'Published' },
  Failed: { color: '#ef4444', bg: '#ef444410', label: 'Failed' },
};

const ScheduleCard = ({ content, platform, dateTime, status = 'Draft', onEdit, onPublish, onDelete }) => {
  const config = statusConfig[status] || statusConfig.Draft;

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2.5,
        bgcolor: '#ffffff',
        border: '1px solid rgba(0,0,0,0.06)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 1.5 }}>
        <PlatformBadge platform={platform} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          {onDelete && (
            <IconButton size="small" onClick={onDelete} sx={{ color: '#94a3b8', '&:hover': { color: '#ef4444' } }}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          )}
          <Chip
            label={config.label}
            size="small"
            sx={{
              borderRadius: 1,
              fontWeight: 600,
              fontSize: '0.6875rem',
              height: 22,
              bgcolor: config.bg,
              color: config.color,
            }}
          />
        </Box>
      </Box>

      <Typography
        variant="body2"
        sx={{
          fontSize: '0.8125rem',
          color: '#334155',
          lineHeight: 1.6,
          mb: 1.5,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {content}
      </Typography>

      <Typography variant="caption" sx={{ fontSize: '0.6875rem', color: '#94a3b8', display: 'block', mb: 1.5 }}>
        {dateTime}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1 }}>
        {status === 'Scheduled' && (
          <Button
            size="small"
            variant="contained"
            onClick={onPublish}
            sx={{ fontSize: '0.7rem', py: 0.4, px: 1.5, borderRadius: 1.5 }}
          >
            Publish Now
          </Button>
        )}
        <Button
          size="small"
          variant="text"
          onClick={onEdit}
          sx={{ fontSize: '0.7rem', py: 0.4, px: 1.5, borderRadius: 1.5, color: '#64748b' }}
        >
          {status === 'Published' ? 'View' : 'Edit'}
        </Button>
      </Box>
    </Box>
  );
};

export default ScheduleCard;
