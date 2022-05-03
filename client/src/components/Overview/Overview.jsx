import { Grid, Paper, Typography } from '@mui/material';
import AnimatedNumber from 'animated-number-react';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';
import { useTaskContext } from '../Tasks/TaskProvider';
import { useTicketContext } from '../Tickets/TicketProvider';

const Overview = () => {
  const { getToken } = useAuth();
  const { tickets, assignedTickets, closedTickets, closedAssignedTickets } =
    useTicketContext();
  const { tasks } = useTaskContext();

  const formatValue = (value) => `${Number(value).toFixed(0)}`;

  axios.interceptors.request.use(
    async (config) => {
      config.headers.authorization = 'Bearer ' + (await getToken());
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <>
      <Grid container spacing={2} columns={{ xs: 4, sm: 8 }}>
        <Grid item xs={4}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
            }}
          >
            <Typography variant="subtitle1" fontSize={20} noWrap>
              Open Tickets
            </Typography>
            <Typography variant="subtitle2" fontSize={35} noWrap>
              <AnimatedNumber
                value={tickets.length + assignedTickets.length}
                formatValue={formatValue}
                duration={500}
              />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
            }}
          >
            <Typography variant="subtitle1" fontSize={20} noWrap>
              Overdue Tickets
            </Typography>
            <Typography variant="subtitle2" fontSize={35}>
              <AnimatedNumber
                value={
                  tickets.filter(
                    (ticket) =>
                      ticket.status === 'open' &&
                      ticket.due_date < new Date().toISOString()
                  ).length +
                  assignedTickets.filter(
                    (ticket) =>
                      ticket.status === 'open' &&
                      ticket.due_date < new Date().toISOString()
                  ).length
                }
                formatValue={formatValue}
                duration={500}
              />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
            }}
          >
            <Typography variant="subtitle1" fontSize={20}>
              Closed Tickets
            </Typography>
            <Typography variant="subtitle2" fontSize={35} noWrap>
              <AnimatedNumber
                value={closedTickets.length + closedAssignedTickets.length}
                formatValue={formatValue}
                duration={500}
              />
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 2,
              borderRadius: 2,
              boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
            }}
          >
            <Typography variant="subtitle1" fontSize={20} noWrap>
              Tasks To Do
            </Typography>
            <Typography variant="subtitle2" fontSize={35} noWrap>
              <AnimatedNumber
                value={tasks.length}
                formatValue={formatValue}
                duration={500}
              />
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Overview;
