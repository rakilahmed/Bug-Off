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
    <Box>
      <Header />
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} sm={6}>
          <TicketProvider>
            <RecentTickets />
            <Box mt={2}>
              <ClosedTickets />
            </Box>
          </TicketProvider>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TaskProvider>
            <Tasks />
            <Box mt={2}>
              <TicketProvider>
                <Overview />
              </TicketProvider>
            </Box>
          </TaskProvider>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
