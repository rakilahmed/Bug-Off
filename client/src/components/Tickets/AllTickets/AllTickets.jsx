/* eslint-disable array-callback-return */
import { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import { Box, Button, Modal } from '@mui/material';
import { Edit, DeleteForever } from '@material-ui/icons';
import { useTicketContext } from '../TicketProvider';
import TicketForm from '../TicketForm';

const AllTickets = () => {
  const { tickets, deleteTicket } = useTicketContext();
  const [ticket, setTicket] = useState('');
  const [openEditForm, setOpenEditForm] = useState(false);

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
      },
    },
    {
      name: 'due_date',
      label: 'Due Date',
      options: { filter: false, sort: true },
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
                width: '60%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
              }}
            >
              <Button onClick={() => handleOpenEditForm(id)}>
                <Edit />
              </Button>
              <Button onClick={() => handleDelete(id)}>
                <DeleteForever />
              </Button>
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

  const handleOpenEditForm = (id) => {
    setTicket(tickets[id]);
    setOpenEditForm(true);
  };
  const handleCloseEditForm = () => setOpenEditForm(false);

  if (openEditForm) {
    return (
      <Box>
        <Modal
          keepMounted
          open={openEditForm}
          onClose={handleCloseEditForm}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: '#363740',
                '&:hover': { backgroundColor: '#363740' },
              }}
              onClick={handleCloseEditForm}
            >
              Close
            </Button>
            <TicketForm openEditForm ticket={ticket} />
          </Box>
        </Modal>
      </Box>
    );
  }

  const options = {
    selectableRows: false,
    responsive: 'vertical',
    print: false,
    downloadOptions: {
      filename: 'tickets.csv',
      separator: ',',
    },
    textLabels: {
      body: {
        noMatch: 'No Tickets Found',
        toolTip: 'Sort',
      },
      toolbar: {
        downloadCsv: 'Download Tickets as CSV',
      },
    },
  };

  return (
    <Box mt={2}>
      <MUIDataTable
        title={'All Tickets'}
        data={tickets}
        columns={columns}
        options={options}
      />
    </Box>
  );
};

export default AllTickets;
