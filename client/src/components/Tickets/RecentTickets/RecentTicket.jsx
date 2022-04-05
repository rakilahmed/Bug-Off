import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material/';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
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
        <Typography variant="subtitle1" sx={{ wordBreak: 'break-all' }}>
          {ticket.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography
            variant="caption"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 70,
              borderRadius: 10,
              color: 'white',
              backgroundColor:
                (ticket.priority === 'Low' && '#29CC97') ||
                (ticket.priority === 'Medium' && '#FEC400') ||
                (ticket.priority === 'High' && '#F12B2C'),
              marginRight: 1,
              padding: 0.3,
            }}
          >
            {ticket.priority}
          </Typography>
          {!showTicket ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </Box>
      </Box>

      {showTicket && (
        <React.Fragment>
          <Box mt={1} sx={{ display: 'flex', flexDirection: 'column' }}>
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
              paddingBlock: 2,
              borderBottom: '1px solid #e6e6e6',
            }}
          >
            {ticket.summary}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="caption">
                Submitted: {moment(ticket.created_at).startOf().fromNow()}
              </Typography>
              <Typography variant="caption">
                Last updated: {moment(ticket.updated_at).startOf().fromNow()}
              </Typography>
            </Box>
            <Box>
              <Tooltip title="Edit" onClick={handleOpenEditForm}>
                <IconButton>
                  <AiOutlineEdit style={{ color: '#363740' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" onClick={() => deleteTicket(ticket._id)}>
                <IconButton>
                  <AiOutlineDelete style={{ color: '#363740' }} />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default RecentTicket;
