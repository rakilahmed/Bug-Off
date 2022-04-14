import { Box, Typography, Tooltip, IconButton } from '@mui/material/';
import { MdRestore } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { useTicketContext } from '../TicketProvider';

const ClosedTicket = ({ ticket }) => {
  const { restoreTicket, deleteTicket } = useTicketContext();

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
            wordBreak: 'break-all',
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
            <IconButton onClick={() => restoreTicket(ticket)}>
              <MdRestore style={{ fontSize: '20px', color: '#363740' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => deleteTicket(ticket._id)}>
              <AiOutlineDelete style={{ fontSize: '20px', color: '#363740' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default ClosedTicket;
