import React, { useState } from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material/';
import { AiOutlineCheck, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import moment from 'moment';
import { useConfirm } from 'material-ui-confirm';
import { useTicketContext } from '../TicketProvider';
import FloatingForm from '../../Utils/FloatingForm';

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

  if (floatingForm) {
    return (
      <FloatingForm
        floatingForm
        ticket={ticket}
        closeForm={handleCloseFloatingForm}
      />
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
                (ticket.due_date < new Date().toISOString() && '#000000') ||
                (ticket.priority === 'Low' && '#29CC97') ||
                (ticket.priority === 'Medium' && '#FEC400') ||
                (ticket.priority === 'High' && '#F12B2C'),

              marginRight: 1,
              padding: 0.3,
            }}
          >
            {ticket.due_date < new Date().toISOString()
              ? 'Overdue'
              : ticket.priority}
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
            <Box mt={0.5}>
              <Tooltip title="Close" onClick={() => closeTicket(ticket)}>
                <IconButton>
                  <AiOutlineCheck
                    style={{ fontSize: '20px', color: '#363740' }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" onClick={handleOpenFloatingForm}>
                <IconButton>
                  <AiOutlineEdit
                    style={{ fontSize: '20px', color: '#363740' }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" onClick={handleDelete}>
                <IconButton>
                  <AiOutlineDelete
                    style={{ fontSize: '20px', color: '#363740' }}
                  />
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
