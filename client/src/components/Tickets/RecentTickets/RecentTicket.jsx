import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material/';
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import moment from 'moment';
import { useConfirm } from 'material-ui-confirm';
import { useTicketContext } from '../TicketProvider';
import TicketForm from '../TicketForm';

const RecentTicket = ({ ticket }) => {
  const { closeTicket, deleteTicket } = useTicketContext();
  const confirm = useConfirm();
  const [showTicket, setShowTicket] = useState(false);
  const [floatingForm, setFloatingForm] = useState(false);

  const handleOpenFloatingForm = () => setFloatingForm(true);
  const handleCloseFloatingForm = () => setFloatingForm(false);

  const handleDelete = async () => {
    await confirm({
      description: 'This will permanently delete the ticket.',
      confirmationText: 'Yup',
      cancellationText: 'Nope',
    });
    deleteTicket(ticket._id);
  };

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

  if (floatingForm) {
    return (
      <Box>
        <Modal
          keepMounted
          open={floatingForm}
          onClose={handleCloseFloatingForm}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                mt: 1,
                mb: 2,
              }}
              onClick={handleCloseFloatingForm}
            >
              Close
            </Button>
            <TicketForm
              floatingForm
              closeForm={handleCloseFloatingForm}
              ticket={ticket}
            />
          </Box>
        </Modal>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: '1px solid #e6e6e6',
        padding: '0.2rem 0.5rem',
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
          {!showTicket ? (
            <Tooltip title="Expand">
              <IconButton>
                <IoIosArrowDown
                  style={{ fontSize: '20px', color: '#363740' }}
                />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Collapse">
              <IconButton>
                <IoIosArrowUp style={{ fontSize: '20px', color: '#363740' }} />
              </IconButton>
            </Tooltip>
          )}
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
            <Box mt={1}>
              <Tooltip title="Close" onClick={() => closeTicket(ticket)}>
                <IconButton>
                  <AiOutlineCheck style={{ color: '#363740' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" onClick={handleOpenFloatingForm}>
                <IconButton>
                  <AiOutlineEdit style={{ color: '#363740' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" onClick={handleDelete}>
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
