import { Box, Typography } from '@mui/material';

const ActivityTimeline = ({ events }) => {
  if (!events?.length) return null;

  return (
    <Box sx={{ position: 'relative' }}>
      {events.map((event, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            gap: 2,
            pb: index < events.length - 1 ? 2.5 : 0,
            position: 'relative',
            '&:not(:last-child)::before': {
              content: '""',
              position: 'absolute',
              left: 11,
              top: 24,
              bottom: 0,
              width: 2,
              bgcolor: 'rgba(0,0,0,0.06)',
            },
          }}
        >
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: event.color ? `${event.color}15` : 'rgba(99,102,241,0.1)',
              color: event.color || '#6366f1',
              flexShrink: 0,
              fontSize: '0.75rem',
              mt: 0.25,
            }}
          >
            {event.icon}
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, fontSize: '0.8125rem', color: '#0f172a' }}
            >
              {event.title}
            </Typography>
            {event.description && (
              <Typography
                variant="body2"
                sx={{ color: '#64748b', fontSize: '0.75rem', mt: 0.25, lineHeight: 1.5 }}
              >
                {event.description}
              </Typography>
            )}
            {event.time && (
              <Typography
                variant="caption"
                sx={{ color: '#94a3b8', fontSize: '0.6875rem', mt: 0.5, display: 'block' }}
              >
                {event.time}
              </Typography>
            )}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ActivityTimeline;
