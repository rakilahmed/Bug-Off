import React, { useState } from 'react';
import { Box, Modal, Typography, Button } from '@mui/material/';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import moment from 'moment';
import { useTicketContext } from '../TicketProvider';
import TicketForm from '../TicketForm';

const RecentTicket = ({ ticket }) => {
  const { deleteTicket } = useTicketContext();
  const [showTicket, setShowTicket] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '22rem',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
    p: 2.5,
  };

  if (openEditForm) {
    return (
      <Box>
        <Modal
          keepMounted
          open={openEditForm}
          onClose={handleCloseEditForm}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: '#363740',
                '&:hover': { backgroundColor: '#363740' },
              }}
              onClick={handleCloseEditForm}
            >
              Close
            </Button>
            <TicketForm openEditForm ticket={ticket} />
          </Box>
        </Modal>
      </Box>
    );
  }

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
          <Typography variant="caption">[{ticket.priority}]</Typography>
          {!showTicket ? <ArrowDropDown /> : <ArrowDropUp />}
        </Box>
      </Box>

      {showTicket && (
        <React.Fragment>
          <Box mt={1} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption">
              Submitted: {moment(ticket.created_at).startOf().fromNow()}
            </Typography>
            <Typography variant="caption">By: {ticket.submitted_by}</Typography>
            <Typography variant="caption">
              Assigned to: {ticket.assigned_to}
            </Typography>
            <Typography variant="caption">
              Due: {moment(ticket.due_date).endOf().fromNow()}
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
              sx={{ marginRight: 1 }}
              variant="contained"
              size="small"
              color="primary"
              onClick={handleOpenEditForm}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => deleteTicket(ticket._id)}
            >
              Delete
            </Button>
          </Box>
          <Typography variant="caption">
            Last updated: {moment(ticket.updated_at).startOf().fromNow()}
          </Typography>
        </React.Fragment>
      )}
    </Box>
  );
};

export default RecentTicket;
