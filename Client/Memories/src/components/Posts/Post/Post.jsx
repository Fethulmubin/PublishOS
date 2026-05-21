import { useState, useRef, useEffect } from 'react';
import {
  Card, CardContent, CardMedia, Box, Typography, IconButton, Avatar, Chip, Button, Divider,
} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import { useSearchParams } from 'react-router-dom';
import LinkedInPublishDialog from '../../Common/LinkedInPublishDialog';
import SchedulePostDialog from '../../Common/SchedulePostDialog';
import AIEnhanceDialog from '../../Common/AIEnhanceDialog';
import { Snackbar, Alert } from '@mui/material';
import { enhancePost as enhancePostApi } from '../../../api';

const creatorRoles = [
  'Content Creator', 'Marketing Strategist', 'AI Researcher', 'Digital Storyteller',
  'Brand Strategist', 'Community Manager', 'Creative Director', 'Social Media Manager',
];

function Post({ post, setCurrentId, showForm, setShowForm }) {
  const user = useSelector((state) => state?.auth?.authData);
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  const [showMenu, setShowMenu] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [linkedInOpen, setLinkedInOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiMode, setAiMode] = useState('enhance');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [expanded, setExpanded] = useState(false);
  const msgRef = useRef(null);
  const [needsTrunc, setNeedsTrunc] = useState(false);

  useEffect(() => {
    if (msgRef.current) {
      setNeedsTrunc(msgRef.current.scrollHeight > msgRef.current.clientHeight);
    }
  }, [post?.message]);

  const roleIndex = post?.creator?.length % creatorRoles.length;
  const creatorRole = creatorRoles[roleIndex];

  const handleLike = () => dispatch(likePost(post?._id));
  const handleDelete = () => { dispatch(deletePost(post._id)); setShowMenu(false); };
  const handleEdit = () => { setCurrentId(post._id); setShowForm(!showForm); setShowMenu(false); };
  const handleComment = () => setSearchParams({ id: post._id });

  const handleShare = async () => {
    const url = `${window.location.origin}/?id=${post._id}`;
    try {
      await navigator.clipboard.writeText(url);
      setSnackbar({ open: true, message: 'Link copied to clipboard!', severity: 'success' });
    } catch {
      setSnackbar({ open: true, message: 'Failed to copy link.', severity: 'error' });
    }
  };

  const handleEnhanceAI = () => { setAiMode('enhance'); setAiOpen(true); };
  const handleRepurpose = () => { setAiMode('rewrite'); setAiOpen(true); };

  const handleAIApply = async (result) => {
    const content = typeof result === 'object' && result !== null ? result.message || result.title : result;
    try {
      const { data } = await enhancePostApi(post._id, content);
      dispatch({ type: 'UPDATE', payload: data.data });
      setSnackbar({ open: true, message: 'Post enhanced with AI successfully!', severity: 'success' });
    } catch (err) {
      setSnackbar({ open: true, message: err.response?.data?.message || 'Failed to update post.', severity: 'error' });
    }
  };

  const postContent = post?.message || post?.title || '';

  return (
    <Card sx={{
      mb: 2.5, overflow: 'visible', borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)',
      transition: 'box-shadow 0.2s ease', '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.08)' },
    }}>
      {/* Author Section */}
      <Box sx={{ px: 2.5, pt: 2.5, pb: 1.5, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ width: 44, height: 44, bgcolor: '#6366f1', fontSize: '1rem', fontWeight: 700, border: '2px solid #e8e8ff' }}>
          {post?.creator?.charAt(0)?.toUpperCase()}
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, fontSize: '0.9375rem', color: '#0f172a' }}>
              {post?.creator}
            </Typography>
            <Chip label="Creator" size="small" sx={{ height: 20, fontSize: '0.625rem', fontWeight: 700, bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', border: 'none', letterSpacing: '0.02em' }} />
          </Box>
          <Typography variant="caption" sx={{ color: '#64748b', fontSize: '0.75rem', display: 'block', mt: 0.2 }}>
            {creatorRole} · {moment(post?.createdAt).fromNow()}
          </Typography>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <IconButton size="small" onClick={() => setShowMenu(!showMenu)} sx={{ color: '#94a3b8' }}>
            <MoreHorizIcon sx={{ fontSize: 20 }} />
          </IconButton>
          {showMenu && user?.result?._id === post?.posterId && (
            <Box sx={{ position: 'absolute', top: 36, right: 0, bgcolor: '#ffffff', borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.06)', zIndex: 10, minWidth: 140, overflow: 'hidden' }}>
              <Button fullWidth startIcon={<EditIcon sx={{ fontSize: 16 }} />} onClick={handleEdit} sx={{ justifyContent: 'flex-start', px: 2, py: 1, color: '#475569', fontSize: '0.8125rem', borderRadius: 0, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}>
                Edit Post
              </Button>
              <Button fullWidth startIcon={<DeleteIcon sx={{ fontSize: 16 }} />} onClick={handleDelete} sx={{ justifyContent: 'flex-start', px: 2, py: 1, color: '#ef4444', fontSize: '0.8125rem', borderRadius: 0, '&:hover': { bgcolor: 'rgba(239,68,68,0.06)' } }}>
                Delete
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* Tags */}
      {post?.tags && post.tags.length > 0 && (
        <Box sx={{ px: 2.5, pb: 0.5, display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <Chip key={tag} label={`#${tag}`} size="small" sx={{ height: 22, fontSize: '0.6875rem', fontWeight: 500, bgcolor: 'rgba(99, 102, 241, 0.06)', color: '#6366f1', borderRadius: 1 }} />
          ))}
        </Box>
      )}

      {/* Content */}
      <CardContent sx={{ px: 2.5, py: 1.5 }}>
        {post?.title && (
          <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.05rem', color: '#0f172a', mb: 0.75, lineHeight: 1.4 }}>
            {post.title}
          </Typography>
        )}
        {post?.message && (
          <Box>
            <Typography
              ref={msgRef}
              variant="body1"
              sx={{
                color: '#334155', fontSize: '0.9375rem', lineHeight: 1.7, whiteSpace: 'pre-wrap',
                ...(!expanded && needsTrunc ? {
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                } : {}),
              }}
            >
              {post.message}
            </Typography>
            {needsTrunc && (
              <Button size="small" onClick={() => setExpanded(!expanded)}
                sx={{ fontSize: '0.75rem', color: '#6366f1', fontWeight: 600, minWidth: 0, p: 0, mt: 0.5 }}>
                {expanded ? 'See less' : 'See more'}
              </Button>
            )}
          </Box>
        )}
      </CardContent>

      {/* Media */}
      {post?.selectedFile && (
        <Box sx={{ px: 2.5, pb: 1.5 }}>
          <Box sx={{ borderRadius: 2.5, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.04)' }}>
            <CardMedia component="img" image={post.selectedFile} alt={post.title || 'Post media'}
              onError={() => setImgError(true)}
              sx={{ width: '100%', maxHeight: 480, objectFit: 'cover', display: imgError ? 'none' : 'block' }}
            />
          </Box>
        </Box>
      )}

      <Divider sx={{ mx: 2.5 }} />

      {/* Engagement + AI Actions */}
      <Box sx={{ px: 2.5, py: 1.5 }}>
        {/* Like count */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          {post?.likes?.length > 0 && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ThumbUpAltIcon sx={{ fontSize: 11, color: '#fff' }} />
              </Box>
              <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 500 }}>{post.likes.length}</Typography>
            </Box>
          )}
        </Box>

        {/* Action buttons */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <Button size="small" startIcon={user && post?.likes?.includes(user?.result?._id) ? <ThumbUpAltIcon sx={{ fontSize: 18, color: '#6366f1' }} /> : <ThumbUpOffAltIcon sx={{ fontSize: 18 }} />}
              onClick={handleLike}
              sx={{ color: user && post?.likes?.includes(user?.result?._id) ? '#6366f1' : '#64748b', fontWeight: 500, fontSize: '0.8125rem', px: 1.5, py: 0.5, borderRadius: 2, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}>
              Like
            </Button>
            <Button size="small" startIcon={<ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />} onClick={handleComment}
              sx={{ color: '#64748b', fontWeight: 500, fontSize: '0.8125rem', px: 1.5, py: 0.5, borderRadius: 2, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}>
              Comment
            </Button>
            <Button size="small" startIcon={<ShareOutlinedIcon sx={{ fontSize: 18 }} />} onClick={handleShare}
              sx={{ color: '#64748b', fontWeight: 500, fontSize: '0.8125rem', px: 1.5, py: 0.5, borderRadius: 2, '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' } }}>
              Share
            </Button>
            <IconButton size="small" onClick={() => { setBookmarked(!bookmarked); setSnackbar({ open: true, message: bookmarked ? 'Bookmark removed' : 'Post bookmarked!', severity: 'success' }); }} sx={{ color: bookmarked ? '#6366f1' : '#94a3b8' }}>
              {bookmarked ? <BookmarkIcon sx={{ fontSize: 18 }} /> : <BookmarkBorderIcon sx={{ fontSize: 18 }} />}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* AI Creator Actions */}
      <Box sx={{ px: 2.5, pb: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        <Button size="small" variant="outlined" startIcon={<AutoAwesomeIcon sx={{ fontSize: 14 }} />} onClick={handleEnhanceAI}
          sx={{ fontSize: '0.75rem', fontWeight: 600, py: 0.6, px: 1.5, borderRadius: 2, borderColor: 'rgba(99,102,241,0.2)', color: '#6366f1', '&:hover': { borderColor: '#6366f1', bgcolor: 'rgba(99,102,241,0.04)' } }}>
          Enhance with AI
        </Button>
        <Button size="small" variant="outlined" startIcon={<ContentCopyIcon sx={{ fontSize: 14 }} />} onClick={handleRepurpose}
          sx={{ fontSize: '0.75rem', fontWeight: 600, py: 0.6, px: 1.5, borderRadius: 2, borderColor: 'rgba(0,0,0,0.1)', color: '#64748b', '&:hover': { borderColor: '#94a3b8' } }}>
          Repurpose
        </Button>
        <Button size="small" variant="outlined" startIcon={<ScheduleIcon sx={{ fontSize: 14 }} />} onClick={() => setScheduleOpen(true)}
          sx={{ fontSize: '0.75rem', fontWeight: 600, py: 0.6, px: 1.5, borderRadius: 2, borderColor: 'rgba(0,0,0,0.1)', color: '#64748b', '&:hover': { borderColor: '#94a3b8' } }}>
          Schedule
        </Button>
        <Button size="small" variant="outlined" startIcon={<LinkedInIcon sx={{ fontSize: 14 }} />} onClick={() => setLinkedInOpen(true)}
          sx={{ fontSize: '0.75rem', fontWeight: 600, py: 0.6, px: 1.5, borderRadius: 2, borderColor: 'rgba(0,0,0,0.1)', color: '#0A66C2', '&:hover': { borderColor: '#0A66C2' } }}>
          Publish to LinkedIn
        </Button>
      </Box>

      <LinkedInPublishDialog open={linkedInOpen} onClose={() => setLinkedInOpen(false)} initialContent={postContent} />
      <SchedulePostDialog open={scheduleOpen} onClose={() => setScheduleOpen(false)} initialContent={postContent} />
      <AIEnhanceDialog open={aiOpen} onClose={() => setAiOpen(false)} initialContent={postContent} mode={aiMode} onApply={handleAIApply} />
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity={snackbar.severity} variant="filled" sx={{ borderRadius: 2 }}>{snackbar.message}</Alert>
      </Snackbar>
    </Card>
  );
}

export default Post;
