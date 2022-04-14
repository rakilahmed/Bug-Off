import { Paper, Typography } from '@mui/material/';
import ClosedTicket from './ClosedTicket';
import { useTicketContext } from '../TicketProvider';

const ClosedTickets = () => {
  const { closedTickets } = useTicketContext();
  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
      }}
    >
      <Typography variant="h6">Closed Tickets</Typography>
      {closedTickets.length > 0 ? (
        closedTickets.slice(0, 5).map((ticket) => {
          return <ClosedTicket key={ticket._id} ticket={ticket} />;
        })
      ) : (
        <Typography sx={{ marginTop: 2 }} varient="body1">
          No closed tickets to show.
        </Typography>
      )}
    </Paper>
  );
};

export default ClosedTickets;
