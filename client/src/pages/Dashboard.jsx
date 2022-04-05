import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../firebase/AuthContext';
import { Box, Grid } from '@mui/material';
import {
  Header,
  TicketProvider,
  RecentTickets,
  TaskProvider,
  Tasks,
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
    <Box minHeight="100vh">
      <Header />
      <Grid
        container
        spacing={{ md: 3, sm: 2, xs: 1 }}
        columns={{ xs: 4, sm: 8, md: 8 }}
      >
        <Grid item xs={4}>
          <TicketProvider>
            <RecentTickets />
          </TicketProvider>
        </Grid>
        <Grid item xs={4}>
          <TaskProvider>
            <Tasks />
          </TaskProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
