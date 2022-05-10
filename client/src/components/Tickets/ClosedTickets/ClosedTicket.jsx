import { Box, Typography, Tooltip, IconButton } from '@mui/material/';
import { MdRestore } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTicketContext } from '../TicketProvider';
import { useConfirm } from 'material-ui-confirm';

const ClosedTicket = ({ ticket }) => {
  const {
    accountType,
    restoreTicket,
    deleteTicket,
    restoreAssignedTicket,
    deleteAssignedTicket,
  } = useTicketContext();
  const confirm = useConfirm();

  const handleRestore = async () => {
    if (accountType === 'employee' && ticket.assigned_to !== 'Self') {
      restoreAssignedTicket(ticket);
    } else {
      restoreTicket(ticket);
    }
  };

  const handleDelete = async () => {
    await confirm({
      description: 'This will permanently delete the ticket.',
      confirmationText: 'Yup',
      cancellationText: 'Nope',
    })
      .then(() => {
        if (accountType === 'employee' && ticket.assigned_to !== 'Self') {
          deleteAssignedTicket(ticket._id);
        } else {
          deleteTicket(ticket._id);
        }
      })
      .catch(() => {
        console.log('Cancelled');
      });
  };

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
          userSelect: 'none',
        }}
      >
        <Typography
          variant="subtitle1"
          sx={{
            color: 'gray',
            textDecoration: 'line-through',
          }}
        >
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
          <Tooltip title="Restore">
            <IconButton onClick={handleRestore}>
              <MdRestore style={{ fontSize: '20px', color: '#363740' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
              <AiOutlineDelete style={{ fontSize: '20px', color: '#363740' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default ClosedTicket;
