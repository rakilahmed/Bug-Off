import React from 'react';
import { Box, Grid } from '@mui/material/';
import TicketForm from './TicketForm';
import TicketItem from './TicketItem';

const TicketItems = ({ tickets, onAddTicket, onDeleteTicket }) => {
  return (
    <Box>
      <TicketForm onAddTicket={onAddTicket} />
      <Grid
        container
        spacing={{ md: 3, xs: 2 }}
        columns={{ xs: 4, sm: 4, md: 12 }}
      >
        {tickets.map((ticket) => {
          return (
            <Grid item xs={4} key={ticket.ticketId}>
              <TicketItem ticket={ticket} onDeleteTicket={onDeleteTicket} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default TicketItems;
