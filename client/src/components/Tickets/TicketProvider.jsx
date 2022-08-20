import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';
import { useEmployeeContext } from '../Employees/EmployeeProvider';

const URI = '/api/tickets';
const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  const { user, getToken, getAccountType } = useAuth();
  const { employees, editEmployee } = useEmployeeContext();
  const [accountType, setAccountType] = useState('');
  const [tickets, setTickets] = useState([]);
  const [assignedTickets, setAssignedTickets] = useState([]);
  const [closedTickets, setClosedTickets] = useState([]);
  const [closedAssignedTickets, setClosedAssignedTickets] = useState([]);

  useEffect(() => {
    if (user) {
      getAccountType().then((accountType) => {
        setAccountType(accountType);
      });

      const fetchTickets = async () => {
        const res = await axios.get(URI);
        try {
          if (res.data[0] && res.data[0].tickets) {
            if (accountType === 'pm') {
              setTickets(
                res.data[0].tickets
                  .filter(
                    (ticket) =>
                      ticket.status === 'open' && ticket.assigned_to === 'Self'
                  )
                  .reverse()
              );

              setAssignedTickets(
                res.data[0].tickets
                  .filter(
                    (ticket) =>
                      ticket.status === 'open' && ticket.assigned_to !== 'Self'
                  )
                  .reverse()
              );

              setClosedTickets(
                res.data[0].tickets
                  .filter(
                    (ticket) =>
                      ticket.status === 'closed' &&
                      ticket.assigned_to === 'Self'
                  )
                  .reverse()
              );

              setClosedAssignedTickets(
                res.data[0].tickets
                  .filter(
                    (ticket) =>
                      ticket.status === 'closed' &&
                      ticket.assigned_to !== 'Self'
                  )
                  .reverse()
              );
            } else {
              setTickets(
                res.data[0].tickets
                  .filter(
                    (ticket) =>
                      ticket.status === 'open' && ticket.assigned_to === 'Self'
                  )
                  .reverse()
              );

              setClosedTickets(
                res.data[0].tickets
                  .filter(
                    (ticket) =>
                      ticket.status === 'closed' &&
                      ticket.assigned_to === 'Self'
                  )
                  .reverse()
              );
            }
          }
        } catch (error) {
          console.log(error);
        }
      };

      const fetchAssignedTickets = async () => {
        const res = await axios.get(URI + `/assigned/${accountType}`);
        try {
          setAssignedTickets(
            res.data
              .filter(
                (ticket) =>
                  ticket.status === 'open' && ticket.assigned_to !== 'Self'
              )
              .reverse()
          );
          setClosedAssignedTickets(
            res.data
              .filter(
                (ticket) =>
                  ticket.status === 'closed' && ticket.assigned_to !== 'Self'
              )
              .reverse()
          );
        } catch (error) {
          console.log(error);
        }
      };

      fetchTickets();
      accountType === 'employee' && fetchAssignedTickets();
    }
  }, [user, accountType, getAccountType]);

  const updateEmaployeeTicketCount = (email, count) => {
    if (employees.length > 0 && email !== undefined && count !== undefined) {
      const employee = employees.find((employee) => employee.email === email);

      if (employee && employee.ticket_count + count >= 0) {
        editEmployee(
          employee._id,
          employee.name,
          employee.email,
          employee.ticket_count + count
        ).then(() => {
          accountType === 'employee' && window.location.reload();
        });
      }
    }
  };

  axios.interceptors.request.use(
    async (config) => {
      config.headers.authorization = 'Bearer ' + (await getToken());
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const addTicket = async (
    title,
    assignedTo,
    assigneeEmail,
    priority,
    dueDate,
    summary
  ) => {
    const res = await axios.post(URI, {
      _id: `${user.uid}`,
      email: `${user.email}`,
      tickets: [
        {
          _id: Math.floor(1000 + Math.random() * 9000),
          status: 'open',
          submitted_by: `${user.displayName}`,
          assigned_to: assignedTo,
          assignee_email: assignedTo === 'Self' ? user.email : assigneeEmail,
          title: title,
          summary: summary,
          priority: priority,
          due_date: dueDate,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    });

    if (accountType === 'pm' && assignedTo !== 'Self') {
      setAssignedTickets([res.data, ...assignedTickets]);
    } else {
      setTickets([res.data, ...tickets]);
    }
    updateEmaployeeTicketCount(assigneeEmail, 1);
  };

  const editTicket = async (
    ticketId,
    assignedTo,
    assigneeEmail,
    requestReassignment,
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
          assignee_email: assignedTo === 'Self' ? user.email : assigneeEmail,
          request_reassignment: requestReassignment,
          title: title,
          summary: summary,
          priority: priority,
          due_date: dueDate,
          created_at: createdAt,
          updated_at: new Date().toISOString(),
        },
      ],
    });

    if (accountType === 'pm' && assignedTo !== 'Self') {
      const assignSelfToEmployee = tickets.find(
        (ticket) => ticket._id === ticketId && ticket.assigned_to === 'Self'
      );

      if (assignSelfToEmployee) {
        setAssignedTickets([res.data, ...assignedTickets]);
        setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
        updateEmaployeeTicketCount(assigneeEmail, 1);
      } else {
        setAssignedTickets(
          assignedTickets.map((ticket) => {
            updateEmaployeeTicketCount(assigneeEmail, 1);
            updateEmaployeeTicketCount(ticket.assignee_email, -1);
            return ticket._id === ticketId ? { ...res.data } : ticket;
          })
        );
      }
    } else if (accountType === 'pm' && assignedTo === 'Self') {
      const assignEmployeeToSelf = assignedTickets.find(
        (ticket) => ticket._id === ticketId && ticket.assigned_to !== assignedTo
      );

      if (assignEmployeeToSelf) {
        setTickets([res.data, ...tickets]);
        setAssignedTickets(
          assignedTickets.filter((ticket) => ticket._id !== ticketId)
        );
        updateEmaployeeTicketCount(assigneeEmail, -1);
      } else {
        setTickets(
          tickets.map((ticket) => {
            return ticket._id === ticketId ? { ...res.data } : ticket;
          })
        );
      }
    } else {
      setTickets(
        tickets.map((ticket) => {
          return ticket._id === ticketId ? { ...res.data } : ticket;
        })
      );
    }
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
          assignee_email: ticket.assignee_email,
          request_reassignment: ticket.request_reassignment,
          title: ticket.title,
          summary: ticket.summary,
          priority: ticket.priority,
          due_date: ticket.due_date,
          created_at: ticket.created_at,
          updated_at: new Date().toISOString(),
        },
      ],
    });

    if (accountType === 'pm' && ticket.assigned_to !== 'Self') {
      setAssignedTickets(
        assignedTickets.filter((ticketItem) => ticketItem._id !== ticket._id)
      );

      setClosedAssignedTickets([res.data, ...closedAssignedTickets]);
      updateEmaployeeTicketCount(ticket.assignee_email, -1);
    } else {
      setTickets(tickets.filter((ticketItem) => ticketItem._id !== ticket._id));
      setClosedTickets([res.data, ...closedTickets]);
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
          assignee_email: ticket.assignee_email,
          request_reassignment: ticket.request_reassignment,
          title: ticket.title,
          summary: ticket.summary,
          priority: ticket.priority,
          due_date: ticket.due_date,
          created_at: ticket.created_at,
          updated_at: new Date().toISOString(),
        },
      ],
    });

    if (accountType === 'pm' && ticket.assigned_to !== 'Self') {
      setClosedAssignedTickets(
        closedAssignedTickets.filter(
          (ticketItem) => ticketItem._id !== ticket._id
        )
      );
      setAssignedTickets([res.data, ...assignedTickets]);
      updateEmaployeeTicketCount(ticket.assignee_email, 1);
    } else {
      setClosedTickets(
        closedTickets.filter((ticketItem) => ticketItem._id !== ticket._id)
      );
      setTickets([res.data, ...tickets]);
    }
  };

  const deleteTicket = async (ticketId) => {
    await axios.delete(URI + `/${ticketId}`);

    if (accountType === 'pm') {
      if (assignedTickets.length > 0) {
        setAssignedTickets(
          assignedTickets.filter((ticket) => ticket._id !== ticketId)
        );
        updateEmaployeeTicketCount(
          assignedTickets.find((ticket) => ticket._id === ticketId)
            .assignee_email,
          -1
        );
      }

      if (closedAssignedTickets.length > 0) {
        setClosedAssignedTickets(
          closedAssignedTickets.filter((ticket) => ticket._id !== ticketId)
        );
      }

      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      setClosedTickets(
        closedTickets.filter((ticket) => ticket._id !== ticketId)
      );
    } else {
      setTickets(tickets.filter((ticket) => ticket._id !== ticketId));
      setClosedTickets(
        closedTickets.filter((ticket) => ticket._id !== ticketId)
      );
    }
  };

  const editAssignedTicket = async (
    ticketId,
    pmName,
    assignedTo,
    assigneeEmail,
    requestReassignment,
    title,
    summary,
    priority,
    dueDate,
    createdAt
  ) => {
    const res = await axios.put(URI + `/assigned/${accountType}/${ticketId}`, {
      tickets: [
        {
          _id: ticketId,
          status: 'open',
          submitted_by: pmName,
          assigned_to: assignedTo,
          assignee_email: assigneeEmail,
          request_reassignment: requestReassignment,
          title: title,
          summary: summary,
          priority: priority,
          due_date: dueDate,
          created_at: createdAt,
          updated_at: new Date().toISOString(),
        },
      ],
    });

    const modifiedTicket = res.data.tickets.filter((ticketItem) => {
      return ticketItem._id === ticketId;
    });

    const updatedAssignedTickets = assignedTickets.map((ticket) => {
      return ticket._id === ticketId ? { ...modifiedTicket[0] } : ticket;
    });

    setAssignedTickets(updatedAssignedTickets);
  };

  const closeAssignedTicket = async (ticket) => {
    const res = await axios.put(
      URI + `/assigned/${accountType}/${ticket._id}`,
      {
        tickets: [
          {
            _id: ticket._id,
            status: 'closed',
            submitted_by: ticket.submitted_by,
            assigned_to: ticket.assigned_to,
            assignee_email: ticket.assignee_email,
            request_reassignment: ticket.request_reassignment,
            title: ticket.title,
            summary: ticket.summary,
            priority: ticket.priority,
            due_date: ticket.due_date,
            created_at: ticket.created_at,
            updated_at: new Date().toISOString(),
          },
        ],
      }
    );

    updateEmaployeeTicketCount(ticket.assignee_email, -1);

    const modifiedTicket = res.data.tickets.filter((ticketItem) => {
      return ticketItem._id === ticket._id;
    });

    const updatedAssignedTickets = assignedTickets.filter((ticketItem) => {
      return ticketItem._id !== ticket._id;
    });

    setAssignedTickets(updatedAssignedTickets);
    setClosedAssignedTickets([modifiedTicket[0], ...closedAssignedTickets]);
  };

  const restoreAssignedTicket = async (ticket) => {
    const res = await axios.put(
      URI + `/assigned/${accountType}/${ticket._id}`,
      {
        tickets: [
          {
            _id: ticket._id,
            status: 'open',
            submitted_by: ticket.submitted_by,
            assigned_to: ticket.assigned_to,
            assignee_email: ticket.assignee_email,
            request_reassignment: ticket.request_reassignment,
            title: ticket.title,
            summary: ticket.summary,
            priority: ticket.priority,
            due_date: ticket.due_date,
            created_at: ticket.created_at,
            updated_at: new Date().toISOString(),
          },
        ],
      }
    );

    updateEmaployeeTicketCount(ticket.assignee_email, 1);

    const modifiedTicket = res.data.tickets.filter((ticketItem) => {
      return ticketItem._id === ticket._id;
    });

    const updatedClosedAssignedTickets = closedAssignedTickets.filter(
      (ticketItem) => {
        return ticketItem._id !== ticket._id;
      }
    );

    setClosedAssignedTickets(updatedClosedAssignedTickets);
    setAssignedTickets([modifiedTicket[0], ...assignedTickets]);
  };

  const deleteAssignedTicket = async (ticketId) => {
    await axios.delete(URI + `/assigned/${accountType}/${ticketId}`);

    const updatedAssignedTickets = assignedTickets.filter((ticketItem) => {
      updateEmaployeeTicketCount(ticketItem.assignee_email, -1);
      return ticketItem._id !== ticketId;
    });
    setAssignedTickets(updatedAssignedTickets);

    const updatedClosedAssignedTickets = closedAssignedTickets.filter(
      (ticketItem) => {
        return ticketItem._id !== ticketId;
      }
    );
    setClosedAssignedTickets(updatedClosedAssignedTickets);
  };

  const deleteAllClosedTickets = async () => {
    await axios.delete(URI + `/closed/${accountType}`);

    setClosedTickets([]);
    setClosedAssignedTickets([]);
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
    assignedTickets,
    closedAssignedTickets,
    editAssignedTicket,
    closeAssignedTicket,
    restoreAssignedTicket,
    deleteAssignedTicket,
    deleteAllClosedTickets,
  };

  return (
    <TicketContext.Provider value={contextValue}>
      {children}
    </TicketContext.Provider>
  );
};

export const useTicketContext = () => useContext(TicketContext);
export default TicketProvider;
