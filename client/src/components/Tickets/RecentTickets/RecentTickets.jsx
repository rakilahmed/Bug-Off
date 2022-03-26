import React from 'react';
import { Box, Typography } from '@mui/material/';
import TicketForm from '../TicketForm';
import RecentTicket from './RecentTicket';
import { useTicketContext } from '../TicketProvider';

const RecentTickets = () => {
  const { tickets } = useTicketContext();
  return (
    <Box>
      <TicketForm title="Recent Tickets" />
      {tickets.length > 0 ? (
        tickets.map((ticket) => {
          return <RecentTicket key={ticket.ticketId} ticket={ticket} />;
        })
      ) : (
        <Typography sx={{ marginTop: 2 }} varient="body1">
          No open tickets to show.
        </Typography>
      )}
    </Box>
  );
};

export default RecentTickets;
