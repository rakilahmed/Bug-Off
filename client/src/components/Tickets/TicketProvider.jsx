import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';

const URI = 'https://bugoff.rakilahmed.com/api/tickets';
const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const { user, getToken } = useAuth();
  const [tickets, setTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await axios.get(URI);
      res.data[0].tickets.length > 0 &&
        setTickets(
          res.data[0].tickets
            .filter((ticket) => ticket.status === 'open')
            .reverse()
        );

      res.data[0].tickets.length > 0 &&
        setClosedTickets(
          res.data[0].tickets
            .filter((ticket) => ticket.status === 'closed')
            .reverse()
        );
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
    await axios.post(URI, {
      _id: `${user.uid}`,
      email: `${user.email}`,
      tickets: [
        {
          _id: Math.floor(1000 + Math.random() * 9000),
          status: 'open',
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
    window.location.reload();
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
    await axios.put(URI + `/${ticketId}`, {
      _id: `${user.uid}`,
      email: `${user.email}`,
      tickets: [
        {
          _id: ticketId,
          status: 'open',
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
    window.location.reload();
  };

  const closeTicket = async (ticket) => {
    await axios.put(URI + `/${ticket._id}`, {
      _id: `${user.uid}`,
      email: `${user.email}`,
      tickets: [
        {
          _id: ticket._id,
          status: 'closed',
          submitted_by: ticket.submitted_by,
          assigned_to: ticket.assigned_to,
          title: ticket.title,
          summary: ticket.summary,
          priority: ticket.priority,
          due_date: ticket.due_date,
          created_at: ticket.created_at,
          updated_at: new Date().toISOString(),
        },
      ],
    });
    window.location.reload();
  };

  const restoreTicket = async (ticket) => {
    await axios.put(URI + `/${ticket._id}`, {
      _id: `${user.uid}`,
      email: `${user.email}`,
      tickets: [
        {
          _id: ticket._id,
          status: 'open',
          submitted_by: ticket.submitted_by,
          assigned_to: ticket.assigned_to,
          title: ticket.title,
          summary: ticket.summary,
          priority: ticket.priority,
          due_date: ticket.due_date,
          created_at: ticket.created_at,
          updated_at: new Date().toISOString(),
        },
      ],
    });
    window.location.reload();
  };

  const deleteTicket = async (ticketId) => {
    await axios.delete(URI + `/${ticketId}`);
    window.location.reload();
  };

  const contextValue = {
    tickets,
    closedTickets,
    addTicket,
    editTicket,
    closeTicket,
    restoreTicket,
    deleteTicket,
  };

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
export default TicketProvider;
