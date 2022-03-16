import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  TextField,
  Button,
  Container,
  Typography,
  Link,
} from '@mui/material';
import { HowToRegSharp } from '@mui/icons-material';
import { Alert } from '@mui/material';
import logo from '../assets/logo.svg';

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

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
            variant="contained"
            color="success"
            sx={{ mt: 1, mb: 2 }}
            startIcon={<HowToRegSharp />}
            onClick={handleRegister}
            disabled={
              !name || !email || !password || password !== confirmPassword
            }
          >
            REGISTER
          </Button>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link href="/login" variant="body2">
              Already have an account? Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
