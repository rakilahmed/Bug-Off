import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { validateEmail } from '../components';
import { useAuth } from '../firebase/AuthContext';

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [emailStatus, setEmailStatus] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
      handleValidation(value, 'email');
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
    }
  };

  const handleResetPassword = async () => {
    setSuccessMessage('');
    setErrorMessage('');

    try {
      await resetPassword(email);
      setSuccessMessage('Check your email to reset your password');
    } catch {
      setErrorMessage('Failed to reset password, try again!');
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
        <Box>
          <Typography variant="h6" mb={2}>
            Forgot Password? No Worries :)
          </Typography>
          <Typography variant="body1" mb={2}>
            Enter your email address and we will send you a link to reset your
            password. Check your spam folder if you don't receive an email.
          </Typography>
          {successMessage && (
            <Alert variant="filled" severity="success" sx={{ mb: 2 }}>
              {successMessage}
            </Alert>
          )}
          {errorMessage && (
            <Alert variant="filled" severity="error" sx={{ mb: 2 }}>
              {errorMessage}
            </Alert>
          )}
          <TextField
            fullWidth
            required
            sx={{ mb: 2 }}
            error={emailHelperText ? true : false}
            name="email"
            label="Email"
            variant="outlined"
            onChange={handleChange}
            helperText={emailHelperText}
          />
          <Button
            fullWidth
            size="large"
            variant="contained"
            sx={{
              mb: 2,
              backgroundColor: '#363740',
              '&:hover': { backgroundColor: '#66bb6a' },
            }}
            onClick={handleResetPassword}
            disabled={!emailStatus}
          >
            Reset Password
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="large"
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Grid>
  );
};

export default ForgotPassword;
