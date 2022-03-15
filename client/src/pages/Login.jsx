import { useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Container,
  Link,
  Typography,
} from '@mui/material';
import { LoginSharp } from '@mui/icons-material';
import logo from '../assets/logo.svg';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/');
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
          <TextField
            fullWidth
            required
            margin="normal"
            id="email"
            name="email"
            label="Email Address"
          />
          <TextField
            fullWidth
            required
            margin="normal"
            type="password"
            id="password"
            name="password"
            label="Password"
          />
          <Button
            fullWidth
            variant="contained"
            color="success"
            sx={{ mt: 1, mb: 2 }}
            startIcon={<LoginSharp />}
            onClick={handleLogin}
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
            <Link href="/" variant="body2">
              Sign in as a Guest User
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
