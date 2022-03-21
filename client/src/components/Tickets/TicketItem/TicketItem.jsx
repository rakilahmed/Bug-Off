import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material/';
import moment from 'moment';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';

const TicketItem = ({ ticket, onDeleteTicket }) => {
  const [showTicket, setShowTicket] = useState(false);

  return (
    <Box
      sx={{
        border: '1px solid #e6e6e6',
        padding: 1,
        borderRadius: 2,
        margin: '1rem auto',
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
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', wordBreak: 'break-all' }}
        >
          {ticket.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption">[#{ticket.ticketId}]</Typography>
          {!showTicket ? <ArrowDropDown /> : <ArrowDropUp />}
        </Box>
      </Box>

      {showTicket && (
        <React.Fragment>
          <Box mt={1} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption">
              Submitted: {moment(ticket.createdAt).startOf().fromNow()}
            </Typography>
            <Typography variant="caption">By: {ticket.submittedBy}</Typography>
            <Typography variant="caption">
              Assigned to: {ticket.assignedTo}
            </Typography>
            <Typography variant="caption">
              Due: {moment(ticket.dueDate).endOf().fromNow()}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              borderTop: '1px solid #e6e6e6',
              padding: 2,
              borderBottom: '1px solid #e6e6e6',
            }}
          >
            {ticket.summary}
          </Typography>
          <Box
            m={1.5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              disabled
              sx={{ marginRight: 1 }}
              variant="contained"
              size="small"
              color="primary"
            >
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
          <Typography variant="caption">
            Last updated: {moment(ticket.updatedAt).startOf().fromNow()}
          </Typography>
        </React.Fragment>
      )}
    </Box>
  );
};

export default TicketItem;
