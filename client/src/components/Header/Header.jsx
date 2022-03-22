import { Box, Typography, Link } from '@mui/material';
import logo from '../../assets/logo.svg';
import DropDownMenu from './DropDownMenu';

const Header = () => {
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
      <DropDownMenu />
    </Box>
  );
};

export default Header;
