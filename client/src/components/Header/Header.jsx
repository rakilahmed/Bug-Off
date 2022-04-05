import { useNavigate } from 'react-router-dom';
import { Box, Typography, Link, Button } from '@mui/material';
import logo from '../../assets/logo.svg';
import { useAuth } from '../../firebase/AuthContext';

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 0 0.5rem 0',
        borderBottom: '1px solid #333',
      }}
    >
      <Link href="/">
        <img
          src={logo}
          alt="logo"
          style={{ width: '3rem', height: '3rem', marginRight: '0.7rem' }}
        />
      </Link>
      <Box sx={{ display: 'flex' }}>
        <Link
          href="/"
          sx={{
            padding: '0.5rem',
            color: 'inherit',
            textDecoration: 'inherit',
            cursor: 'pointer',
            '&:hover': { borderBottom: '1px solid #333' },
          }}
        >
          <Typography>Dashboard</Typography>
        </Link>
        <Link
          href="/tickets"
          sx={{
            padding: '0.5rem',
            color: 'inherit',
            textDecoration: 'inherit',
            cursor: 'pointer',
            '&:hover': { borderBottom: '1px solid #333' },
          }}
        >
          <Typography>Tickets</Typography>
        </Link>
        <Link
          href="/profile"
          sx={{
            padding: '0.5rem',
            color: 'inherit',
            textDecoration: 'inherit',
            cursor: 'pointer',
            '&:hover': { borderBottom: '1px solid #333' },
          }}
        >
          <Typography>Profile</Typography>
        </Link>
        <Button
          size="small"
          variant="outlined"
          color="inherit"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
