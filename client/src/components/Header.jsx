import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/AuthContext';
import { Box, Button, Typography, Link } from '@mui/material';
import { LogoutSharp } from '@mui/icons-material';
import logo from '../assets/logo.svg';

const Header = () => {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
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
        padding: '1rem',
        borderBottom: '1px solid #333',
      }}
    >
      <Link
        sx={{
          color: 'inherit',
          textDecoration: 'inherit',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        href="/"
      >
        <img
          src={logo}
          alt="logo"
          style={{ width: '3rem', height: '3rem', marginRight: '0.7rem' }}
        />
        <Typography
          variant="overline"
          fontSize="1.3rem"
          sx={{ display: { md: 'block', xs: 'none' } }}
        >
          Bug Off
        </Typography>
      </Link>
      <Button
        variant="contained"
        color="warning"
        endIcon={<LogoutSharp />}
        onClick={handleLogout}
      >
        LOGOUT
      </Button>
    </Box>
  );
};

export default Header;
