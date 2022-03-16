import { Box, Typography, Link } from '@mui/material';

const Copyright = () => {
  return (
    <Typography variant="subtitle2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Bug Off
      </Link>
      {' — '}
      {new Date().getFullYear()}
    </Typography>
  );
};

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '95vh',
      }}
    >
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 2,
          mt: 'auto',
          borderTop: '1px solid #333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Typography variant="subtitle1">
            Get that "Bug Off" of your project ...
          </Typography>
          <Typography variant="subtitle2">
            Having any issues?{' '}
            <Link color="inherit" href="/">
              Contact Us
            </Link>
          </Typography>
          <Copyright />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
