import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import {
  Grid,
  Paper,
  Box,
  TextField,
  Button,
  Alert,
  Typography,
} from '@mui/material';
import { RiAdminLine } from 'react-icons/ri';
import { Header } from '../components';
import { validateEmail, validatePassword } from '../components/';

const Profile = () => {
  const {
    user,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
    setAccountType,
    getAccountType,
  } = useAuth();
  const navigate = useNavigate();
  const [profileType, setProfileType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [nameHelperText, setNameHelperText] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
  const [passwordHelperText, setPasswordHelperText] = useState('');
  const [confirmPasswordHelperText, setConfirmPasswordHelperText] =
    useState('');
  const [nameStatus, setNameStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    getAccountType().then((accountType) => {
      setProfileType(accountType);
    });
  }, [navigate, user, getAccountType]);

  const handleUpdateProfile = (event) => {
    event.preventDefault();
    const promises = [];
    setUpdateError('');

    if (name !== '' && name !== user.displayName) {
      promises.push(updateUserName(name));
    }
    if (email !== '' && email !== user.email) {
      promises.push(updateUserEmail(email));
    }
    if (password !== '') {
      promises.push(updateUserPassword(password));
    }

    Promise.all(promises)
      .then(() => {
        setMessage('Profile updated');
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      })
      .catch(() => {
        setUpdateError('Failed to update account, try again!');
      });
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
        setNameHelperText('');
      } else if (value.length < 3) {
        setNameStatus(false);
        setNameHelperText('Name must be at least 3 characters');
      } else if (value === user?.displayName) {
        setNameStatus(false);
        setNameHelperText('Current name is the same');
      } else {
        setNameStatus(true);
        setNameHelperText('');
      }
    } else if (type === 'email') {
      if (value === user?.email) {
        setEmailStatus(false);
        setEmailHelperText('Current email is the same');
      } else if (value.length === 0) {
        setEmailStatus(false);
        setEmailHelperText('');
      } else if (!validateEmail(value)) {
        setEmailStatus(false);
        setEmailHelperText('Email is invalid');
      } else {
        setEmailStatus(true);
        setEmailHelperText('');
      }
    } else if (type === 'password') {
      if (value !== '' && !validatePassword(value)) {
        setPasswordHelperText(
          'Password must be at least 8 characters long. It must contain at least one lowercase letter, one uppercase letter, one number, and one of these characters ! @ # $ % ^ & *'
        );
      } else {
        setPasswordHelperText('');
      }
    } else if (type === 'confirm-password') {
      if (confirmPassword + value[value.length - 1] === password) {
        passwordHelperText === '' && setPasswordStatus(true);
        setConfirmPasswordHelperText('');
      } else {
        setPasswordStatus(false);
        setConfirmPasswordHelperText('Passwords do not match');
      }
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  const handleAccountTypeSwitch = async () => {
    if (profileType === 'pm') {
      await setAccountType('personal');
    } else {
      await setAccountType('pm');
    }
    window.location.reload();
  };

  return (
    <Box>
      <Header />
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '85vh' }}
      >
        <Paper
          sx={{
            maxWidth: '30rem',
            padding: 3,
            borderRadius: 2,
            boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
          }}
        >
          {profileType !== '' && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <RiAdminLine />
                <Typography variant="subtitle2" ml={1}>
                  {profileType === 'personal' && 'Personal'}
                  {profileType === 'pm' && 'Product Manager'}
                  {profileType === 'employee' && 'Employee'}
                </Typography>
              </Box>
              {profileType !== 'employee' && (
                <Typography
                  variant="subtitle2"
                  color={'secondary'}
                  sx={{ cursor: 'pointer' }}
                  onClick={handleAccountTypeSwitch}
                >
                  Switch to{' '}
                  {profileType === 'pm' ? 'Personal' : 'Product Manager'}
                </Typography>
              )}
            </Box>
          )}

          <Box>
            {message && (
              <Alert variant="filled" severity="success">
                {message}
              </Alert>
            )}
            {updateError && (
              <Alert variant="filled" severity="error">
                {updateError}
              </Alert>
            )}
            <TextField
              disabled
              fullWidth
              margin="normal"
              id="current-name"
              name="current-name"
              label="Current Name"
              value={user?.displayName}
            />
            <TextField
              disabled
              fullWidth
              margin="normal"
              id="current-email"
              name="current-email"
              label="Current Email"
              value={user?.email}
            />
            <TextField
              fullWidth
              error={nameHelperText ? true : false}
              margin="normal"
              id="name"
              name="name"
              label="New Name"
              value={name}
              onChange={handleChange}
              helperText={nameHelperText}
            />
            <TextField
              fullWidth
              error={emailHelperText ? true : false}
              margin="normal"
              id="email"
              name="email"
              label="New Email"
              value={email}
              onChange={handleChange}
              helperText={emailHelperText}
            />
            <Box display={'flex'}>
              <TextField
                style={{ paddingRight: '1rem' }}
                fullWidth
                error={passwordHelperText ? true : false}
                margin="normal"
                type="password"
                id="password"
                name="password"
                label="New Password"
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
            </Box>
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
              onClick={handleUpdateProfile}
              disabled={
                nameStatus || emailStatus || passwordStatus ? false : true
              }
            >
              UPDATE
            </Button>
            <Button
              fullWidth
              variant="outlined"
              size="large"
              onClick={handleGoBack}
            >
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
};

export default Profile;
