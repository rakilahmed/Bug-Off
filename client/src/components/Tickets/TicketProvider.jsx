import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';
import { useEmployeeContext } from '../Employees/EmployeeProvider';

const URI = 'https://bugoff.rakilahmed.com/api/tickets';
const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const { user, getToken, getAccountType } = useAuth();
  const { employees, editEmployee } = useEmployeeContext();
  const [tickets, setTickets] = useState([]);
  const [accountType, setAccountType] = useState('');
  const [closedTickets, setClosedTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await axios.get(URI);
      try {
        if (res.data[0] && res.data[0].tickets) {
          setTickets(
            res.data[0].tickets
              .filter((ticket) => ticket.status === 'open')
              .reverse()
          );
          setClosedTickets(
            res.data[0].tickets
              .filter((ticket) => ticket.status === 'closed')
              .reverse()
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    const fetchAccountType = async () => {
      setAccountType(await getAccountType());
    };

    fetchTickets();
    fetchAccountType();
  }, [getAccountType]);

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
          status: 'open',
          submitted_by: `${user.displayName}`,
          assigned_to: assignedTo ? assignedTo : 'Self',
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

    if (employees.length > 0) {
      const employee = employees.find(
        (employee) => employee.name === assignedTo
      );

      editEmployee(
        employee._id,
        employee.name,
        employee.email,
        employee.ticket_count + 1
      );
    }
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

    if (employees.length > 0) {
      const ticket = tickets.find((ticket) => ticket._id === ticketId);
      const employee = employees.find(
        (employee) => employee.name === ticket.assigned_to
      );

      if (employee.name !== assignedTo) {
        const newAssigned = employees.find(
          (employee) => employee.name === assignedTo
        );

        editEmployee(
          newAssigned._id,
          newAssigned.name,
          newAssigned.email,
          newAssigned.ticket_count + 1
        );

        if (employee.ticket_count > 0) {
          editEmployee(
            employee._id,
            employee.name,
            employee.email,
            employee.ticket_count - 1
          );
        } else {
          editEmployee(employee._id, employee.name, employee.email, 0);
        }
      }
    }

    setTickets(
      tickets.map((ticket) => {
        return ticket._id === ticketId ? { ...res.data } : ticket;
      })
    );
  };

  const closeTicket = async (ticket) => {
    const res = await axios.put(URI + `/${ticket._id}`, {
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

    const updatedTickets = tickets.filter((ticketItem) => {
      return ticketItem._id !== ticket._id;
    });

    setTickets(updatedTickets);
    setClosedTickets([res.data, ...closedTickets]);

    if (employees.length > 0) {
      const employee = employees.find(
        (employee) => employee.name === ticket.assigned_to
      );

      if (employee.ticket_count > 0) {
        editEmployee(
          employee._id,
          employee.name,
          employee.email,
          employee.ticket_count - 1
        );
      } else {
        editEmployee(employee._id, employee.name, employee.email, 0);
      }
    }
  };

  const restoreTicket = async (ticket) => {
    const res = await axios.put(URI + `/${ticket._id}`, {
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

    const updatedClosedTickets = closedTickets.filter((ticketItem) => {
      return ticketItem._id !== ticket._id;
    });

    setClosedTickets(updatedClosedTickets);
    setTickets([res.data, ...tickets]);

    if (employees.length > 0) {
      const employee = employees.find(
        (employee) => employee.name === ticket.assigned_to
      );

      editEmployee(
        employee._id,
        employee.name,
        employee.email,
        employee.ticket_count + 1
      );
    }
  };

  const deleteTicket = async (ticketId) => {
    const ticket = tickets.find((ticket) => ticket._id === ticketId);
    const employee = employees.find(
      (employee) => employee.name === ticket.assigned_to
    );

    await axios.delete(URI + `/${ticketId}`);

    const updatedTickets = tickets.filter((ticket) => {
      return ticket._id !== ticketId;
    });
    setTickets(updatedTickets);

    const updatedClosedTickets = closedTickets.filter((ticket) => {
      return ticket._id !== ticketId;
    });
    setClosedTickets(updatedClosedTickets);

    if (employees.length > 0) {
      if (employee.ticket_count > 0) {
        editEmployee(
          employee._id,
          employee.name,
          employee.email,
          employee.ticket_count - 1
        );
      } else {
        editEmployee(employee._id, employee.name, employee.email, 0);
      }
    }
  };

  const contextValue = {
    accountType,
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
