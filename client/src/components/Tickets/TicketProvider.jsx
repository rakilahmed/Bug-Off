import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';

// const URI = 'https://bugoff.rakilahmed.com/api/tickets';
const URI = 'http://localhost:8080/api/tickets';
const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const { user, getToken } = useAuth();
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await axios.get(URI);
      res.data[0].tickets.length > 0 &&
        setTickets(res.data[0].tickets.reverse());
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
      _id: `${user.uid}`,
      email: `${user.email}`,
      tickets: [
        {
          _id: Math.floor(1000 + Math.random() * 9000),
          submitted_by: `${user.displayName}`,
          assigned_to: assignedTo,
          title: title,
          summary: summary,
          priority: priority,
          due_date: dueDate,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    });
    setTickets([res.data, ...tickets]);
  };

  const editTicket = async (
    ticketId,
    assignedTo,
    title,
    summary,
    priority,
    dueDate,
    createdAt
  ) => {
    const res = await axios.put(URI + `/${ticketId}`, {
      _id: `${user.uid}`,
      email: `${user.email}`,
      tickets: [
        {
          _id: ticketId,
          submitted_by: `${user.displayName}`,
          assigned_to: assignedTo,
          title: title,
          summary: summary,
          priority: priority,
          due_date: dueDate,
          created_at: createdAt,
          updated_at: new Date().toISOString(),
        },
      ],
    });
    setTickets(
      tickets.map((ticket) => {
        return ticket._id === ticketId ? { ...res.data } : ticket;
      })
    );
  };

  const deleteTicket = async (ticketId) => {
    await axios.delete(URI + `/${ticketId}`);
    const updatedTickets = tickets.filter((ticket) => {
      return ticket._id !== ticketId;
    });
    setTickets(updatedTickets);
  };

  const contextValue = { tickets, addTicket, editTicket, deleteTicket };

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
export default TicketProvider;
