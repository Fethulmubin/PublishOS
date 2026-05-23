import { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  CircularProgress,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import memories from '../../assets/memories.png';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignup) {
        await dispatch(signup(formData, navigate));
        toast.success('Successfully signed up');
      } else {
        await dispatch(signin(formData, navigate));
        toast.success('Successfully logged in');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setShowPassword(false);
    setFormData(initialState);
  };

  const googleSuccess = async (res) => {
    const profileObj = res.credential
      ? JSON.parse(atob(res?.credential.split('.')[1]))
      : {};
    const Token = res?.credential;
    try {
      dispatch({ type: 'AUTH', data: { result: profileObj, token: Token } });
      navigate('/feed');
    } catch (error) {
      console.error('Google login failed', error);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: '#f8fafc',
      }}
    >
      {/* Branding Panel */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          p: 8,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            top: -100,
            right: -100,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
            bottom: -50,
            left: -50,
          },
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Box
            component="img"
            src={memories}
            alt="Memories"
            sx={{
              height: 40,
              mb: 4,
              filter: 'brightness(0) invert(1)',
            }}
          />
          <AutoAwesomeIcon sx={{ fontSize: 48, color: 'rgba(255,255,255,0.3)', mb: 2 }} />
          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              color: '#fff',
              mb: 2,
              fontSize: '2.5rem',
              letterSpacing: '-0.03em',
            }}
          >
            Creator Studio
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255,255,255,0.7)',
              maxWidth: 360,
              fontSize: '1rem',
              lineHeight: 1.7,
            }}
          >
            The modern platform for creators to publish, manage, and grow their audience with AI-powered tools.
          </Typography>
        </Box>
      </Box>

      {/* Auth Form Panel */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            maxWidth: 420,
            width: '100%',
            p: 4,
            borderRadius: 3,
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        >
          {/* Mobile logo */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <Box
              component="img"
              src={memories}
              alt="Memories"
              sx={{ height: 28 }}
            />
          </Box>

          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: '#0f172a',
              mb: 0.5,
              textAlign: 'center',
            }}
          >
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#64748b',
              mb: 3,
              textAlign: 'center',
              fontSize: '0.875rem',
            }}
          >
            {isSignup
              ? 'Start your creator journey today'
              : 'Sign in to continue to your dashboard'}
          </Typography>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress size={32} sx={{ color: '#6366f1' }} />
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              {isSignup && (
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <TextField
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    size="small"
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}

              <TextField
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                value={formData.email}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: 2 }}
              />

              <TextField
                name="password"
                label="Password"
                variant="outlined"
                fullWidth
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleChange}
                required
                size="small"
                sx={{ mb: isSignup ? 2 : 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ color: '#94a3b8' }}
                      >
                        {showPassword ? (
                          <VisibilityOffIcon sx={{ fontSize: 18 }} />
                        ) : (
                          <VisibilityIcon sx={{ fontSize: 18 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {isSignup && (
                <TextField
                  name="confirmPassword"
                  label="Confirm Password"
                  variant="outlined"
                  fullWidth
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  size="small"
                  sx={{ mb: 3 }}
                />
              )}

              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                sx={{
                  py: 1.2,
                  fontWeight: 700,
                  fontSize: '0.9375rem',
                  borderRadius: 2,
                  mb: 2,
                }}
              >
                {isSignup ? 'Create Account' : 'Sign In'}
              </Button>

              <Divider sx={{ mb: 2 }}>
                <Typography
                  variant="caption"
                  sx={{ color: '#94a3b8', px: 1, fontSize: '0.75rem' }}
                >
                  OR
                </Typography>
              </Divider>

              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                <GoogleLogin
                  onSuccess={googleSuccess}
                  onError={googleFailure}
                  size="large"
                  shape="rectangular"
                  text={isSignup ? 'signup_with' : 'signin_with'}
                />
              </Box>

              <Button
                type="button"
                fullWidth
                onClick={switchMode}
                sx={{
                  color: '#6366f1',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  '&:hover': { bgcolor: 'rgba(99,102,241,0.06)' },
                }}
              >
                {isSignup
                  ? 'Already have an account? Sign In'
                  : "Don't have an account? Sign Up"}
              </Button>
            </form>
          )}
        </Paper>
      </Box>

      <ToastContainer position="top-center" autoClose={3000} />
    </Box>
  );
};

export default Auth;
