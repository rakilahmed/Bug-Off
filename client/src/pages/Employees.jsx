import { Box } from '@mui/material';
import { useAuth } from '../firebase/AuthContext';
import { Header, AllEmployees } from '../components/';
import { useEffect } from 'react';

const Employees = () => {
  const { getAccountType } = useAuth();

  useEffect(() => {
    getAccountType().then((accountType) => {
      if (accountType !== 'pm') {
        window.location.href = '/';
      }
    });
  }, [getAccountType]);

  return (
    <Box mb={5}>
      <Header />
      <AllEmployees />
    </Box>
  );
};

export default Employees;
