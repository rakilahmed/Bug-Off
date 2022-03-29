import { createContext, useState, useEffect, useContext } from 'react';
import { Paper } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';

const URI = 'https://bugoff.rakilahmed.com/api/tickets';
const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const { user, getToken } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await axios.get(URI);
      setTickets(res.data.reverse());
    };
    fetchTickets();
  }, []);

  axios.interceptors.request.use(
    async (config) => {
      config.headers.authorization = 'Bearer ' + (await getToken());
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const addTicket = async (title, assignedTo, priority, dueDate, summary) => {
    const res = await axios.post(URI, {
      uid: `${user.uid}`,
      submittedBy: `${user.displayName}`,
      email: `${user.email}`,
      assignedTo: assignedTo,
      ticketId: Math.floor(1000 + Math.random() * 9000),
      title: title,
      priority: priority,
      dueDate: dueDate,
      summary: summary,
    });
    setTickets([res.data, ...tickets]);
  };

  const editTicket = async (
    ticketId,
    title,
    assignedTo,
    priority,
    dueDate,
    summary
  ) => {
    const res = await axios.put(URI + `/${ticketId}`, {
      uid: `${user.uid}`,
      submittedBy: `${user.displayName}`,
      email: `${user.email}`,
      assignedTo: assignedTo,
      ticketId: Math.floor(1000 + Math.random() * 9000),
      title: title,
      priority: priority,
      dueDate: dueDate,
      summary: summary,
    });
    setTickets(
      tickets.map((ticket) => {
        return ticket.ticketId === ticketId ? { ...res.data } : ticket;
      })
    );
  };

  const deleteTicket = async (ticketId) => {
    await axios.delete(URI + `/${ticketId}`);
    const updatedTickets = tickets.filter((ticket) => {
      return ticket.ticketId !== ticketId;
    });
    setTickets(updatedTickets);
  };

  const contextValue = { tickets, addTicket, editTicket, deleteTicket };

  return (
    <Paper
      sx={{
        marginTop: 2,
        padding: 2,
        borderRadius: 2,
        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
      }}
    >
      <TicketContext.Provider value={contextValue}>
        {children}
      </TicketContext.Provider>
    </Paper>
  );
};

export const useTicketContext = () => useContext(TicketContext);
export default TicketProvider;
