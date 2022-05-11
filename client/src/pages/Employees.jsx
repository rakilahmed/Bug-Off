import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../firebase/AuthContext';
import { Header, AllEmployees } from '../components/';

const Employees = () => {
  const { getAccountType } = useAuth();
  const navigate = useNavigate();
  const [profileType, setProfileType] = useState('');

  useEffect(() => {
    getAccountType().then((accountType) => {
      setProfileType(accountType);

      if (accountType !== 'pm') {
        navigate('/');
      }
    });
  }, [getAccountType, navigate]);

  return (
    profileType === 'pm' && (
      <Box mb={5}>
        <Header />
        <AllEmployees />
      </Box>
    )
  );
};

export default Employees;
