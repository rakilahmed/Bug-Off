import { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import { Box, Paper, Tooltip, IconButton, Typography } from '@mui/material';
import { AiOutlineEdit, AiOutlineDelete, AiOutlineCheck } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { useConfirm } from 'material-ui-confirm';
import { useAuth } from '../../../firebase/AuthContext';
import { useTicketContext } from '../TicketProvider';
import FloatingForm from '../../Utils/FloatingForm';

const AllTickets = () => {
  const { user } = useAuth();
  const { tickets, closeTicket, deleteTicket } = useTicketContext();
  const confirm = useConfirm();
  const [ticket, setTicket] = useState('');
  const [floatingForm, setFloatingForm] = useState(false);

  const handleForm = () => {
    setFloatingForm(true);
  };

  const handleOpenFloatingForm = (id) => {
    setTicket(tickets[id]);
    setFloatingForm(true);
  };

  const handleCloseFloatingForm = () => {
    setFloatingForm(false);
    setTicket('');
  };

  const handleClose = (id) => {
    closeTicket(tickets[id]);
  };

  const handleDelete = async (id) => {
    await confirm({
      description: 'This will permanently delete the ticket.',
      confirmationText: 'Yup',
      cancellationText: 'Nope',
    });
    deleteTicket(tickets[id]._id);
  };

  const columns = [
    {
      name: '_id',
      label: 'ID',
      options: {
        filter: false,
        display: 'false',
      },
    },
    {
      name: 'submitted_by',
      label: 'Submitted By',
      options: {
        filter: false,
        display: 'false',
      },
    },
    {
      name: 'title',
      label: 'Title',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'assigned_to',
      label: 'Assigned To',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'summary',
      label: 'Summary',
      options: {
        filter: false,
        sort: true,
      },
    },
    {
      name: 'priority',
      label: 'Priority',
      options: {
        filter: true,
        sort: true,
        customBodyRenderLite: (id) => {
          return (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                borderRadius: 5,
                color: 'white',
                backgroundColor:
                  (tickets[id].due_date < new Date().toISOString() &&
                    '#000000') ||
                  (tickets[id].priority === 'Low' && '#29CC97') ||
                  (tickets[id].priority === 'Medium' && '#FEC400') ||
                  (tickets[id].priority === 'High' && '#F12B2C'),
                padding: 0.3,
              }}
            >
              {tickets[id].due_date < new Date().toISOString()
                ? 'Overdue'
                : tickets[id].priority}
            </Box>
          );
        },
      },
    },
    {
      name: 'due_date',
      label: 'Due Date',
      options: {
        filter: false,
        sort: true,
        customBodyRenderLite: (id) => {
          return <>{moment(tickets[id].due_date).endOf().fromNow()}</>;
        },
      },
    },
    {
      name: 'Actions',
      options: {
        sort: false,
        filter: false,
        setCellHeaderProps: () => ({ align: 'center' }),
        customBodyRenderLite: (id) => {
          return (
            <Box
              sx={{
                width: '4rem',
                display: 'flex',
                marginRight: '0.5rem',
              }}
            >
              <Tooltip title="Close" onClick={() => handleClose(id)}>
                <IconButton>
                  <AiOutlineCheck style={{ fontSize: 20, color: '#363740' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Edit" onClick={() => handleOpenFloatingForm(id)}>
                <IconButton>
                  <AiOutlineEdit style={{ fontSize: 20, color: '#363740' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" onClick={() => handleDelete(id)}>
                <IconButton>
                  <AiOutlineDelete style={{ fontSize: 20, color: '#363740' }} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    },
  ];

  if (floatingForm) {
    return ticket ? (
      <FloatingForm
        floatingForm
        closeForm={handleCloseFloatingForm}
        ticket={ticket}
      />
    ) : (
      <FloatingForm
        newTicket
        floatingForm
        closeForm={handleCloseFloatingForm}
      />
    );
  }

  const options = {
    selectableRows: 'none',
    responsive: 'vertical',
    print: false,
    downloadOptions: {
      filename: 'tickets.csv',
      separator: ',',
    },
    textLabels: {
      body: {
        noMatch: 'No Tickets To Show',
        toolTip: 'Sort',
      },
      toolbar: {
        downloadCsv: 'Download Tickets as CSV',
      },
    },
    customFilterDialogFooter: () => <Box width={300} />,
  };

  return (
    <>
      <Paper
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBlock: 2,
          padding: 2,
          boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
        }}
      >
        <Typography variant="h6">
          {moment().hour() < 12
            ? `Good Morning, ${user?.displayName}`
            : `Good Evening, ${user?.displayName}`}
        </Typography>
        <Tooltip title="Add Ticket" onClick={handleForm}>
          <IconButton>
            <GrAdd style={{ fontSize: 25 }} />
          </IconButton>
        </Tooltip>
      </Paper>
      <MUIDataTable
        title={'All Tickets'}
        data={tickets}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default AllTickets;
