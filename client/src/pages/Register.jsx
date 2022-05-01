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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Alert } from '@mui/material';
import logo from '../assets/logo.svg';
import { validateEmail, validatePassword } from '../components';

const Register = () => {
  const { user, register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('personal');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [nameHelperText, setNameHelperText] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState('');
  const [nameStatus, setNameStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleRegister = async (event) => {
    event.preventDefault();
    setRegisterError('');
    try {
      await register(name, type, email, password);
    } catch {
      setRegisterError('Failed to register, try again!');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
      handleValidation(value, 'name');
    } else if (name === 'email') {
      setEmail(value);
      handleValidation(value, 'email');
    } else if (name === 'password') {
      setPassword(value);
      handleValidation(value, 'password');
    } else if (name === 'confirm-password') {
      setConfirmPassword(value);
      handleValidation(value, 'confirm-password');
    }
  };

  const handleValidation = (value, type) => {
    if (type === 'name') {
      if (value.length === 0) {
        setNameStatus(false);
        setNameHelperText('Name is required');
      } else if (value.length < 3) {
        setNameStatus(false);
        setNameHelperText('Name must be at least 3 characters');
      } else {
        setNameStatus(true);
        setNameHelperText('');
      }
    } else if (type === 'email') {
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
        setPasswordHelperText('Password is required');
      } else if (validatePassword(value)) {
        setPasswordHelperText('');
      } else {
        setPasswordHelperText(
          'Password must be at least 8 characters long. It must contain at least one lowercase letter, one uppercase letter, one number, and one of these characters ! @ # $ % ^ & *'
        );
      }
    } else if (type === 'confirm-password') {
      if (value.length === 0) {
        setPasswordStatus(false);
        setConfirmPasswordHelperText('Confirm Password is required');
      } else if (confirmPassword + value[value.length - 1] === password) {
        setPasswordStatus(true);
        setConfirmPasswordHelperText('');
      } else {
        setPasswordStatus(false);
        setConfirmPasswordHelperText('Passwords do not match');
      }
    }
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
          {registerError && (
            <Alert variant="filled" severity="error">
              {registerError}
            </Alert>
          )}
          <TextField
            fullWidth
            required
            error={nameHelperText ? true : false}
            margin="normal"
            id="name"
            name="name"
            label="Name"
            onChange={handleChange}
            helperText={nameHelperText}
          />
          <FormControl fullWidth required sx={{ mt: 1, mr: 1 }}>
            <InputLabel>Type</InputLabel>
            <Select
              value={type}
              label="Priority"
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem value="personal">Personal</MenuItem>
              <MenuItem value="pm">Product Manager</MenuItem>
              <MenuItem value="employee">Employee</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            required
            error={emailHelperText ? true : false}
            margin="normal"
            id="email"
            name="email"
            label="Email"
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
            onChange={handleChange}
            helperText={passwordHelperText}
          />
          <TextField
            fullWidth
            required
            error={confirmPasswordHelperText ? true : false}
            margin="normal"
            type="password"
            id="confirm-password"
            name="confirm-password"
            label="Confirm Password"
            onChange={handleChange}
            helperText={confirmPasswordHelperText}
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
              nameStatus && emailStatus && passwordStatus ? false : true
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
