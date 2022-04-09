import { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import {
  Box,
  Button,
  Modal,
  Paper,
  Tooltip,
  IconButton,
  Typography,
} from '@mui/material';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { useAuth } from '../../../firebase/AuthContext';
import { useTicketContext } from '../TicketProvider';
import TicketForm from '../TicketForm';
import { GrAdd } from 'react-icons/gr';

const AllTickets = () => {
  const { user } = useAuth();
  const { tickets, deleteTicket } = useTicketContext();
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

  const handleDelete = (id) => {
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
                  (tickets[id].priority === 'Low' && '#29CC97') ||
                  (tickets[id].priority === 'Medium' && '#FEC400') ||
                  (tickets[id].priority === 'High' && '#F12B2C'),
                padding: 0.3,
              }}
            >
              {tickets[id].priority}
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
        customBodyRenderLite: (id) => {
          return (
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Tooltip title="Edit" onClick={() => handleOpenFloatingForm(id)}>
                <IconButton>
                  <AiOutlineEdit style={{ color: '#363740' }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete" onClick={() => handleDelete(id)}>
                <IconButton>
                  <AiOutlineDelete style={{ color: '#363740' }} />
                </IconButton>
              </Tooltip>
            </Box>
          );
        },
      },
    },
  ];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '22rem',
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
    p: 2.5,
  };

  if (floatingForm) {
    return (
      <Box>
        <Modal
          keepMounted
          open={floatingForm}
          onClose={handleCloseFloatingForm}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                mt: 1,
                mb: 2,
              }}
              onClick={handleCloseFloatingForm}
            >
              Close
            </Button>
            {ticket ? (
              <TicketForm
                floatingForm
                closeForm={handleCloseFloatingForm}
                ticket={ticket}
              />
            ) : (
              <TicketForm
                newTicket
                floatingForm
                closeForm={handleCloseFloatingForm}
              />
            )}
          </Box>
        </Modal>
      </Box>
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
            ? `Good Morning, ${user.displayName}`
            : `Good Evening, ${user.displayName}`}
        </Typography>
        <Tooltip title="Add Ticket" onClick={handleForm}>
          <IconButton>
            <GrAdd style={{ fontSize: 25 }} />
          </IconButton>
        </Tooltip>
        {/* <TicketForm
          title={
            moment().hour() < 12
              ? `Good Morning, ${user.displayName}`
              : `Good Evening, ${user.displayName}`
          }
          floatingForm={false}
        /> */}
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
