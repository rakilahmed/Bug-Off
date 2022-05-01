import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import {
  Box,
  TextField,
  Button,
  Link,
  Typography,
  Grid,
  Paper,
} from '@mui/material';
import { Alert } from '@mui/material';
import logo from '../assets/logo.svg';
import { validateEmail, validatePassword } from '../components';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoginError('');

    try {
      await login(email, password);
      navigate('/');
    } catch {
      setLoginError('Failed to login, try again!');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
      handleValidation(value, 'email');
    } else if (name === 'password') {
      setPassword(value);
      handleValidation(value, 'password');
    }
  };

  const handleValidation = (value, type) => {
    if (type === 'email') {
      if (value.length === 0) {
        setEmailStatus(false);
        setEmailHelperText('Email is required');
      } else if (validateEmail(value)) {
        setEmailStatus(true);
        setEmailHelperText('');
      } else {
        setEmailStatus(false);
        setEmailHelperText('Email is invalid');
      }
    } else if (type === 'password') {
      if (value.length === 0) {
        setPasswordStatus(false);
        setPasswordHelperText('Password is required');
      } else if (validatePassword(value)) {
        setPasswordStatus(true);
        setPasswordHelperText('');
      } else {
        setPasswordStatus(false);
        setPasswordHelperText(
          'Password must be at least 8 characters long. It must contain at least one lowercase letter, one uppercase letter, one number, and one of these characters ! @ # $ % ^ & *'
        );
      }
    }
  };

  const handleGuest = () => {
    setEmail('admin@bugoff.com');
    setPassword('bugoff2022');
    setEmailStatus(true);
    setPasswordStatus(true);
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '95vh' }}
    >
      <Paper
        sx={{
          maxWidth: '30rem',
          margin: 1,
          padding: 3,
          borderRadius: 2,
          boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="overline" fontSize="2rem">
            Bug
          </Typography>
          <img
            src={logo}
            alt="logo"
            style={{ width: '4rem', height: '4rem', margin: '0 1rem' }}
          />
          <Typography variant="overline" fontSize="2rem">
            Off
          </Typography>
        </Box>
        <Box sx={{ mt: 2 }}>
          {loginError && (
            <Alert variant="filled" severity="error">
              {loginError}
            </Alert>
          )}
          <TextField
            fullWidth
            required
            error={emailHelperText ? true : false}
            margin="normal"
            id="email"
            name="email"
            label="Email"
            value={email}
            onChange={handleChange}
            helperText={emailHelperText}
          />
          <TextField
            fullWidth
            required
            error={passwordHelperText ? true : false}
            margin="normal"
            type="password"
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={handleChange}
            helperText={passwordHelperText}
          />
          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mt: 1,
              mb: 2,
              backgroundColor: '#363740',
              '&:hover': { backgroundColor: '#66bb6a' },
            }}
            onClick={handleLogin}
            disabled={emailStatus && passwordStatus ? false : true}
          >
            LOGIN
          </Button>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Link
              href="/login"
              variant="body2"
              style={{ textDecoration: 'none' }}
            >
              Forgot password?
            </Link>
            <Link
              href="/register"
              variant="body2"
              style={{ textDecoration: 'none' }}
            >
              Don't have an account? Register
            </Link>
            <Link
              onClick={handleGuest}
              variant="body2"
              style={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Sign in as a guest user
            </Link>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Login;
