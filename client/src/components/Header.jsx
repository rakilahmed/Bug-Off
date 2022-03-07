import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { LogoutSharp } from '@mui/icons-material';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
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
      <Typography variant="h4">Bug Off</Typography>
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
