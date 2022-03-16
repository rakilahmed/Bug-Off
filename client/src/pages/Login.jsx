import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  TextField,
  Button,
  Container,
  Link,
  Typography,
} from '@mui/material';
import { LoginSharp } from '@mui/icons-material';
import { Alert } from '@mui/material';
import logo from '../assets/logo.svg';

const Login = () => {
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await logIn(email, password);
      navigate('/');
    } catch {
      setError('Login failed, try again!');
    }
  };

  const handleGuest = () => {
    setEmail('demo@bugoff.com');
    setPassword('bugoff2022');
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: '5rem', height: '5rem', marginRight: '1rem' }}
          />
          <Typography variant="overline" fontSize="2rem">
            Bug Off
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
            variant="contained"
            color="success"
            sx={{ mt: 1, mb: 2 }}
            startIcon={<LoginSharp />}
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
            <Link href="/login" variant="body2">
              Forgot password?
            </Link>
            <Link href="/register" variant="body2">
              Don't have an account? Register
            </Link>
            <Link onClick={handleGuest} variant="body2">
              Sign in as a Guest User
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
