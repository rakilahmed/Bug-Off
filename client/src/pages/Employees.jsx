import { Navigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useAuth } from '../firebase/AuthContext';
import { Header, AllEmployees } from '../components/';

const Employees = () => {
  const { userType } = useAuth();

  return userType === 'pm' ? (
    <Box mb={5}>
      <Header />
      <AllEmployees />
    </Box>
  ) : (
    <Navigate to="/" />
  );
};

export default Employees;
