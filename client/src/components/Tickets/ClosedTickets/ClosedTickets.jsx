import { useState } from 'react';
import { Paper, Typography, Box } from '@mui/material/';
import { BsArrowDown } from 'react-icons/bs';
import ClosedTicket from './ClosedTicket';
import { useTicketContext } from '../TicketProvider';

const ClosedTickets = () => {
  const { closedTickets, closedAssignedTickets } = useTicketContext();
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
      {closedAssignedTickets.length > 0
        ? closedAssignedTickets.slice(0, 5).map((ticket, idx) => {
            return <ClosedTicket key={idx} ticket={ticket} />;
          })
        : loadMore &&
          closedAssignedTickets.slice(0, 10).map((ticket, idx) => {
            return <ClosedTicket key={idx} ticket={ticket} />;
          })}

      {closedAssignedTickets.length > 0 && closedTickets.length > 0 && <hr />}

      {!loadMore && closedTickets.length > 0
        ? closedTickets.slice(0, 5).map((ticket, idx) => {
            return <ClosedTicket key={idx} ticket={ticket} />;
          })
        : loadMore &&
          closedTickets.slice(0, 10).map((ticket, idx) => {
            return <ClosedTicket key={idx} ticket={ticket} />;
          })}

      {closedTickets.length === 0 && closedAssignedTickets.length === 0 && (
        <Typography sx={{ marginTop: 2 }} varient="body1">
          No closed tickets to show.
        </Typography>
      )}

      {!loadMore && closedTickets.length + closedAssignedTickets.length > 5 ? (
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
