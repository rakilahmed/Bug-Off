import { Box } from '@mui/material';
import { useAuth } from '../firebase/AuthContext';
import { Header, AllEmployees } from '../components/';
import { useEffect } from 'react';

const Employees = () => {
  const { userType } = useAuth();

  useEffect(() => {
    if (userType !== 'pm') {
      window.location.href = '/';
    }
  }, [userType]);

  return (
    <Box mb={5}>
      <Header />
      <AllEmployees />
    </Box>
  );
};

export default Employees;
