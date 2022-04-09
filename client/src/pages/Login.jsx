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

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Login failed, try again!');
    }
  };

  const handleGuest = () => {
    setEmail('admin@bugoff.com');
    setPassword('bugoff2022');
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
          maxWidth: '25rem',
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
          {error && (
            <Alert variant="filled" severity="error">
              {error}
            </Alert>
          )}
          <TextField
            fullWidth
            required
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            type="password"
            id="password"
            name="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            disabled={!email || !password}
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
