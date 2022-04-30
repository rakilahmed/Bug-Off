import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../firebase/AuthContext';
import { Header, AllEmployees } from '../components/';

const Tickets = () => {
  const { user, getAccountType } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }

    const fetchAccountType = async () => {
      const res = await getAccountType();
      if (res !== 'pm') {
        navigate('/');
      }
    };

    fetchAccountType();
  }, [getAccountType, navigate, user]);

  return (
    <Box mb={5}>
      <Header />
      <AllEmployees />
    </Box>
  );
};

export default Tickets;
