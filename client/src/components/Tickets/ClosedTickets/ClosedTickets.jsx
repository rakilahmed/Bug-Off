import { useState } from 'react';
import { Paper, Typography, Box } from '@mui/material/';
import { BsArrowDown } from 'react-icons/bs';
import ClosedTicket from './ClosedTicket';
import { useTicketContext } from '../TicketProvider';

const ClosedTickets = () => {
  const { closedTickets } = useTicketContext();
  const [loadMore, setLoadMore] = useState(false);

  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
      }}
    >
      <Typography variant="h6">Closed Tickets</Typography>
      {!loadMore && closedTickets.length > 0 ? (
        closedTickets.slice(0, 5).map((ticket) => {
          return <ClosedTicket key={ticket._id} ticket={ticket} />;
        })
      ) : loadMore ? (
        closedTickets.slice(0, 10).map((ticket) => {
          return <ClosedTicket key={ticket._id} ticket={ticket} />;
        })
      ) : (
        <Typography sx={{ marginTop: 2 }} varient="body1">
          No closed tickets to show.
        </Typography>
      )}

      {!loadMore && closedTickets.length > 5 ? (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography
            variant="body2"
            color={'secondary'}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => setLoadMore(true)}
          >
            Load More <BsArrowDown style={{ marginLeft: 5 }} />
          </Typography>
        </Box>
      ) : (
        loadMore &&
        closedTickets.length > 10 && (
          <Typography variant="body2" color={'secondary'}>
            You can only see the first 10 closed tickets here. <br /> Delete few
            closed tickets from the list to see more.
          </Typography>
        )
      )}
    </Paper>
  );
};

export default ClosedTickets;
