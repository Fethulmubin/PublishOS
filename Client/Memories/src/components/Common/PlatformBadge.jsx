import { Chip } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import YouTubeIcon from '@mui/icons-material/YouTube';

const platformConfig = {
  linkedin: { icon: <LinkedInIcon sx={{ fontSize: 14 }} />, color: '#0A66C2', bg: '#0A66C210' },
  twitter: { icon: <TwitterIcon sx={{ fontSize: 14 }} />, color: '#1DA1F2', bg: '#1DA1F210' },
  instagram: { icon: <InstagramIcon sx={{ fontSize: 14 }} />, color: '#E4405F', bg: '#E4405F10' },
  facebook: { icon: <FacebookIcon sx={{ fontSize: 14 }} />, color: '#1877F2', bg: '#1877F210' },
  youtube: { icon: <YouTubeIcon sx={{ fontSize: 14 }} />, color: '#FF0000', bg: '#FF000010' },
  tiktok: { icon: <TwitterIcon sx={{ fontSize: 14 }} />, color: '#000000', bg: '#00000010' },
};

const PlatformBadge = ({ platform, label }) => {
  const config = platformConfig[platform?.toLowerCase()] || platformConfig.linkedin;

  return (
    <Chip
      icon={config.icon}
      label={label || platform}
      size="small"
      sx={{
        borderRadius: 1.5,
        fontWeight: 600,
        fontSize: '0.6875rem',
        height: 24,
        bgcolor: config.bg,
        color: config.color,
        '& .MuiChip-icon': { ml: 0.5, color: config.color },
      }}
    />
  );
};

export default PlatformBadge;
