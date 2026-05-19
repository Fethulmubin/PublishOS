import { Box, Typography, Avatar, Chip, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LinkIcon from '@mui/icons-material/Link';
import BadgeIcon from '@mui/icons-material/Badge';

const CreatorProfileHeader = ({ user, stats, socialLinks }) => {
  return (
    <Box sx={{ borderRadius: 3, overflow: 'hidden', bgcolor: '#ffffff', border: '1px solid rgba(0,0,0,0.06)' }}>
      <Box
        sx={{
          height: { xs: 100, sm: 160 },
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #7c3aed 100%)',
          position: 'relative',
        }}
      />
      <Box sx={{ px: { xs: 2, sm: 3 }, pb: 3, position: 'relative' }}>
        <Avatar
          src={user?.imageURL}
          sx={{
            width: { xs: 64, sm: 80 },
            height: { xs: 64, sm: 80 },
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            bgcolor: '#6366f1',
            border: '4px solid #ffffff',
            position: 'absolute',
            top: { xs: -32, sm: -40 },
            left: { xs: 16, sm: 24 },
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          {user?.name?.charAt(0)?.toUpperCase()}
        </Avatar>

        <Box sx={{ mt: { xs: 3.5, sm: 5 }, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#0f172a' }}>
              {user?.name || 'Creator'}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5, flexWrap: 'wrap' }}>
              <Chip
                icon={<BadgeIcon sx={{ fontSize: 14 }} />}
                label="Content Creator"
                size="small"
                sx={{ borderRadius: 1.5, fontWeight: 600, fontSize: '0.6875rem', bgcolor: 'rgba(99,102,241,0.1)', color: '#6366f1' }}
              />
              {user?.location && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, color: '#64748b' }}>
                  <LocationOnIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{user.location}</Typography>
                </Box>
              )}
              {socialLinks?.website && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, color: '#6366f1' }}>
                  <LinkIcon sx={{ fontSize: 14 }} />
                  <Typography variant="caption" sx={{ fontSize: '0.75rem' }}>{socialLinks.website}</Typography>
                </Box>
              )}
            </Box>
          </Box>
          <Button variant="outlined" size="small" sx={{ borderRadius: 2, fontSize: '0.75rem', mt: 1 }}>
            Edit Profile
          </Button>
        </Box>

        {user?.bio && (
          <Typography variant="body2" sx={{ color: '#475569', fontSize: '0.8125rem', mt: 1.5, lineHeight: 1.6 }}>
            {user.bio}
          </Typography>
        )}

        <Box sx={{ display: 'flex', gap: { xs: 2, sm: 4 }, mt: 2.5, pt: 2.5, borderTop: '1px solid rgba(0,0,0,0.06)', justifyContent: { xs: 'space-between', sm: 'flex-start' } }}>
          {[
            { label: 'Posts', value: stats?.posts || '--' },
            { label: 'Followers', value: stats?.followers || '--' },
            { label: 'Following', value: stats?.following || '--' },
            { label: 'Engagement', value: stats?.engagement || '--' },
          ].map((stat) => (
            <Box key={stat.label} sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', color: '#0f172a' }}>
                {stat.value}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8', fontWeight: 500, fontSize: '0.7rem' }}>
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CreatorProfileHeader;
