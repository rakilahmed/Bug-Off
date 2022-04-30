import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { Box, Grid } from '@mui/material';
import {
  Header,
  RecentTickets,
  Tasks,
  Overview,
  ClosedTickets,
} from '../components/';

const Dashboard = () => {
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
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <RecentTickets />
          <Box mt={2}>
            <ClosedTickets />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Tasks />
          <Box mt={2}>
            <Overview />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
