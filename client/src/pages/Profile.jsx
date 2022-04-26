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

const Profile = () => {
  const {
    user,
    getAccountType,
    updateUserName,
    updateUserEmail,
    updateUserPassword,
  } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

  useEffect(() => {
    let isMounted = true;
    if (!user) {
      navigate('/login');
    }

    const getType = async () => {
      const accountType = await getAccountType();
      if (isMounted) {
        setType(accountType);
      }
    };

    getType();
    return () => {
      isMounted = false;
    };
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
        setUpdateError('Failed to update account');
      });
  };

  const handleGoBack = () => {
    navigate('/');
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
          {type !== '' && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <RiAdminLine />
              <Typography variant="subtitle1" ml={1}>
                {type === 'personal' && 'Personal'}
                {type === 'pm' && 'Product Manager'}
                {type === 'employee' && 'Employee'}
              </Typography>
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
              margin="normal"
              id="name"
              name="name"
              label="New Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              margin="normal"
              id="email"
              name="email"
              label="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box display={'flex'}>
              <TextField
                style={{ paddingRight: '1rem' }}
                fullWidth
                margin="normal"
                type="password"
                id="password"
                name="password"
                label="New Password"
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
                (!name && !email && !password && !confirmPassword) ||
                password !== confirmPassword
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
