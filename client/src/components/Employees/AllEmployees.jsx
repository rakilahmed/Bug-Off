import { useState } from 'react';
import MUIDataTable from 'mui-datatables';
import moment from 'moment';
import { Box, Paper, Tooltip, IconButton, Typography } from '@mui/material';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import { useConfirm } from 'material-ui-confirm';
import { useAuth } from '../../firebase/AuthContext';
import FloatingForm from '../Utils/FloatingForm';
import { useEmployeeContext } from './EmployeeProvider';

const AllEmployees = () => {
  const { user } = useAuth();
  const { employees, deleteEmployee } = useEmployeeContext();
  const confirm = useConfirm();
  const [employee, setEmployee] = useState('');
  const [floatingForm, setFloatingForm] = useState(false);

  const handleForm = () => {
    setFloatingForm(true);
  };

  const handleOpenFloatingForm = (id) => {
    setEmployee(employees[id]);
    setFloatingForm(true);
  };

  const handleCloseFloatingForm = () => {
    setFloatingForm(false);
    setEmployee('');
  };

  const handleDelete = async (id) => {
    await confirm({
      description: 'This will permanently delete the employee.',
      confirmationText: 'Yup',
      cancellationText: 'Nope',
    })
      .then(() => {
        deleteEmployee(employees[id]._id);
      })
      .catch(() => {
        console.log('Cancelled');
      });
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
      name: 'name',
      label: 'Name',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: { width: '25%' },
        }),
      },
    },
    {
      name: 'email',
      label: 'Email',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: { width: '40%' },
        }),
      },
    },
    {
      name: 'ticket_count',
      label: 'Ticket Count',
      options: {
        filter: true,
        sort: true,
        setCellProps: () => ({
          style: { width: '20%' },
        }),
      },
    },
    {
      name: 'Actions',
      options: {
        sort: false,
        filter: false,
        setCellProps: () => ({
          style: { width: '1%' },
        }),
        setCellHeaderProps: () => ({ align: 'center' }),
        customBodyRenderLite: (id) => {
          return (
            <Box
              sx={{
                display: 'flex',
              }}
            >
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
    return employee ? (
      <FloatingForm
        floatingForm
        closeForm={handleCloseFloatingForm}
        employee={employee}
      />
    ) : (
      <FloatingForm
        newEmployee
        floatingForm
        closeForm={handleCloseFloatingForm}
      />
    );
  }

  const options = {
    selectableRows: 'none',
    responsive: 'standard',
    print: false,
    downloadOptions: {
      filename: 'employees.csv',
      separator: ',',
    },
    textLabels: {
      body: {
        noMatch: 'No Employees To Show',
        toolTip: 'Sort',
      },
      toolbar: {
        downloadCsv: 'Download Employees as CSV',
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
        <Tooltip title="Add Employee" onClick={handleForm}>
          <IconButton>
            <GrAdd style={{ fontSize: 25 }} />
          </IconButton>
        </Tooltip>
      </Paper>
      <MUIDataTable
        title={'All Employees'}
        data={employees}
        columns={columns}
        options={options}
      />
    </>
  );
};

export default AllEmployees;
