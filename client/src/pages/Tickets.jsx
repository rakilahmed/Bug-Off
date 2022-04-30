import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../firebase/AuthContext';
import { Header, AllTickets } from '../components/';

const Tickets = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [navigate, user]);

  return (
    <Box mb={5}>
      <Header />
      <AllTickets />
    </Box>
  );
};

export default Tickets;
