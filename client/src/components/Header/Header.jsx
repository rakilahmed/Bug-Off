import { useNavigate } from 'react-router-dom';
import { Box, Link, Tooltip, IconButton } from '@mui/material';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { IoTicketSharp } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';
import { ImExit } from 'react-icons/im';
import { AiOutlineMore } from 'react-icons/ai';
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
        marginBottom: 2,
      }}
    >
      <Link href="/">
        <img src={logo} alt="logo" style={{ width: '3rem', height: '3rem' }} />
      </Link>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Link href="/">
          <Tooltip title="Dashboard">
            <IconButton>
              <MdOutlineDashboardCustomize color="#363740" />
            </IconButton>
          </Tooltip>
        </Link>
        <Link href="/tickets">
          <Tooltip title="Tickets">
            <IconButton>
              <IoTicketSharp color="#363740" />
            </IconButton>
          </Tooltip>
        </Link>
        <Link href="/profile">
          <Tooltip title="Profile">
            <IconButton>
              <CgProfile color="#363740" />
            </IconButton>
          </Tooltip>
        </Link>
        <AiOutlineMore style={{ marginInline: 10, fontSize: 30 }} />
        <Tooltip title="Logout" onClick={handleLogout}>
          <IconButton>
            <ImExit color="#363740" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
