import React from 'react';
import { Box, Typography } from '@mui/material/';
import TicketForm from './TicketForm';
import TicketItem from './TicketItem';

const TicketItems = ({ tickets, onAddTicket, onDeleteTicket }) => {
  return (
    <Box>
      <TicketForm onAddTicket={onAddTicket} />
      {tickets.length > 0 ? (
        tickets.map((ticket) => {
          return (
            <TicketItem
              key={ticket.ticketId}
              ticket={ticket}
              onDeleteTicket={onDeleteTicket}
            />
          );
        })
      ) : (
        <Typography sx={{ marginTop: 2 }} varient="body1">
          No open tickets to show.
        </Typography>
      )}
    </Box>
  );
};

export default TicketItems;
