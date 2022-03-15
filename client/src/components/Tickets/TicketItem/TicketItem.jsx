import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material/';
import moment from 'moment';
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material';

const TicketItem = ({ ticket, onDeleteTicket }) => {
  const [showTicket, setShowTicket] = useState(false);

  return (
    <Box
      sx={{
        maxWidth: '30rem',
        margin: '1rem auto',
        padding: '0.8rem',
        borderRadius: '5px',
        border: '1px solid #333',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setShowTicket(!showTicket)}
      >
        <Typography variant="subtitle1">
          <b>{ticket.title}</b> [{ticket.ticketId}]
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1">By: {ticket.submittedBy}</Typography>
          {!showTicket ? <KeyboardArrowDown /> : <KeyboardArrowUp />}
        </Box>
      </Box>

      {showTicket && (
        <React.Fragment>
          <hr />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2">
              Assigned to: <b>{ticket.assignedTo}</b>
            </Typography>
            <Typography variant="subtitle2">
              Due by: {moment(ticket.dueDate).format('ddd, MMM Do')} at{' '}
              {moment(ticket.dueDate).format('LT')}
            </Typography>
          </Box>
          <hr />
          <Typography variant="inherit">{ticket.summary}</Typography>
          <hr />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle2">
              Submitted on: {moment(ticket.createdAt).format('ddd, MMM Do')} at{' '}
              {moment(ticket.createdAt).format('LT')}
            </Typography>
            <Typography variant="subtitle2">
              Last edited on: {moment(ticket.createdAt).format('ddd, MMM Do')}{' '}
              at {moment(ticket.createdAt).format('LT')}
            </Typography>
            <Box
              mt={1}
              mb={1}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Button disabled variant="contained" size="small" color="primary">
                Edit
              </Button>
              <Button
                variant="contained"
                size="small"
                color="error"
                onClick={() => onDeleteTicket(ticket.ticketId)}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default TicketItem;
