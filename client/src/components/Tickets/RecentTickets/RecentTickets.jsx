import { Paper, Typography, Box, Link } from '@mui/material/';
import { BsArrowRight } from 'react-icons/bs';
import TicketForm from '../TicketForm';
import RecentTicket from './RecentTicket';
import { useTicketContext } from '../TicketProvider';

const RecentTickets = () => {
  const { tickets } = useTicketContext();
  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
      }}
    >
      <TicketForm title="Recent Tickets" />
      {tickets.length > 0 ? (
        tickets.slice(0, 5).map((ticket) => {
          return <RecentTicket key={ticket._id} ticket={ticket} />;
        })
      ) : (
        <Typography sx={{ marginTop: 2 }} varient="body1">
          No open tickets to show.
        </Typography>
      )}
      {tickets.length > 5 && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link
            href="/tickets"
            variant="body2"
            style={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            View All <BsArrowRight style={{ marginLeft: 5 }} />
          </Link>
        </Box>
      )}
    </Paper>
  );
};

export default RecentTickets;
