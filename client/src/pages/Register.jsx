import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  Paper,
} from '@mui/material';
import { Alert } from '@mui/material';
import logo from '../assets/logo.svg';

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setError('');
    try {
      await register(name, email, password);
      navigate('/login');
    } catch {
      setError('Failed to register, try again!');
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
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
            id="name"
            name="name"
            label="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
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
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            type="password"
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
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
            onClick={handleRegister}
            disabled={
              !name || !email || !password || password !== confirmPassword
            }
          >
            REGISTER
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              href="/login"
              variant="body2"
              style={{ textDecoration: 'none' }}
            >
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Paper>
    </Grid>
  );
};

export default Register;
