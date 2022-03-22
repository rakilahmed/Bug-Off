import { useState, useEffect } from 'react';
import axios from 'axios';
import TicketItems from './TicketItem/TicketItems';
import { useAuth } from '../../firebase/AuthContext';
import { Paper } from '@mui/material';

const URI = 'https://bugoff.rakilahmed.com/api/tickets';

const Tickets = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    if (user) {
      fetchTickets();
    }
  }, [user]);

  const fetchTickets = async () => {
    const res = await axios.get(URI);
    setTickets(res.data);
  };

  const addTicket = async (title, assignedTo, priority, dueDate, summary) => {
    await axios.post(URI, {
      submittedBy: `${user.displayName}`,
      email: `${user.email}`,
      assignedTo: assignedTo,
      ticketId: Math.floor(1000 + Math.random() * 9000),
      title: title,
      priority: priority,
      dueDate: dueDate,
      summary: summary,
    });
    fetchTickets();
  };

  const deleteTicket = async (ticketId) => {
    await axios.delete(URI + `/${ticketId}`);
    fetchTickets();
  };

  return (
    <Paper
      sx={{
        marginTop: 2,
        padding: 2,
        borderRadius: 2,
        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
      }}
    >
      <TicketItems
        tickets={tickets}
        onAddTicket={addTicket}
        onDeleteTicket={deleteTicket}
      />
    </Paper>
  );
};

export default Tickets;
