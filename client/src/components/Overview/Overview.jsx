import { Grid, Paper, Typography } from '@mui/material';
import AnimatedNumber from 'animated-number-react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../firebase/AuthContext';

const TICKETS = 'https://bugoff.rakilahmed.com/api/tickets';
const TASKS = 'https://bugoff.rakilahmed.com/api/tasks';

const Overview = ({ overdueTickets = 2, closedTickets = 7 }) => {
  const { getToken } = useAuth();
  const [ticketsCount, setTicketsCount] = useState(0);
  const [tasksCount, setTasksCount] = useState(0);
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

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await axios.get(TICKETS);
      setTicketsCount(
        res.data[0].tickets.length ? res.data[0].tickets.length : 0
      );
    };

    const fetchTasks = async () => {
      const res = await axios.get(TASKS);
      setTasksCount(res.data[0].tasks.length ? res.data[0].tasks.length : 0);
    };

    fetchTickets();
    fetchTasks();
  }, []);

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
                value={ticketsCount}
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
                value={overdueTickets}
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
                value={closedTickets}
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
                value={tasksCount}
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
