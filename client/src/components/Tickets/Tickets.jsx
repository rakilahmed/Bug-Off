import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { TicketItems } from './TicketItem';
import { useAuth } from '../../context/AuthContext';

const URI = 'http://44.201.83.36';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const timeOut = (time) => {
    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
    }, time);
  };

  const fetchTickets = async () => {
    timeOut(1000);
    const res = await axios.get(URI + '/api/tickets');
    setTickets(res.data);
  };

  const addTicket = async (title, assignedTo, dueDate, summary) => {
    await axios.post(URI + '/api/tickets', {
      submittedBy: 'Admin',
      email: 'rakil@bugoff.com',
      assignedTo: assignedTo,
      ticketId: Math.floor(1000 + Math.random() * 9000),
      title: title,
      summary: summary,
      dueDate: dueDate,
    });

    fetchTickets();
  };

  const deleteTicket = async (ticketId) => {
    await axios.delete(URI + `/api/tickets/${ticketId}`);
    fetchTickets();
  };

  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <CircularProgress style={{ color: '#333' }} />
      </div>
    );
  }

  return (
    <Box>
      <TicketItems
        tickets={tickets}
        onAddTicket={addTicket}
        onDeleteTicket={deleteTicket}
      />
    </Box>
  );
};

export default Tickets;
