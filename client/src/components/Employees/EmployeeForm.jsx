import { useState } from 'react';
import { Box, FormGroup, TextField, Button } from '@mui/material/';
import { useEmployeeContext } from './EmployeeProvider';

const EmployeeForm = ({
  floatingForm = false,
  newEmployee = false,
  closeForm,
  employee,
}) => {
  const { addEmployee, editEmployee } = useEmployeeContext();
  const [showForm, setShowForm] = useState(floatingForm ? floatingForm : false);
  const [nameInput, setNameInput] = useState(employee ? employee.name : '');
  const [emailInput, setEmailInput] = useState(employee ? employee.email : '');
  const [nameStatus, setNameStatus] = useState(false);
  const [emailStatus, setEmailStatus] = useState(false);

  const handleForm = () => {
    newEmployee && closeForm();
    setShowForm(!showForm);
    setNameInput('');
    setEmailInput('');
    setNameStatus(false);
    setEmailStatus(false);
  };

  const handleFloatingForm = () => {
    closeForm();
    setNameStatus(false);
    setEmailStatus(false);
  };

  const validateName = (event) => {
    setNameInput(event.target.value);
    event.target.value === '' ? setNameStatus(false) : setNameStatus(true);
  };

  const validateEmail = (event) => {
    setEmailInput(event.target.value);
    event.target.value === '' ? setEmailStatus(false) : setEmailStatus(true);
  };

  const handleAddEmployee = (event) => {
    event.preventDefault();
    addEmployee(nameInput, emailInput);
    handleForm();
  };

  const handleEditEmployee = (event) => {
    event.preventDefault();
    editEmployee(employee._id, nameInput, emailInput, employee.ticket_count);
    handleFloatingForm();
  };

  return (
    <Box>
      {showForm && (
        <Box>
          <FormGroup>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <TextField
                fullWidth
                required
                margin="normal"
                id="employee-name"
                label="Name"
                variant="outlined"
                value={nameInput}
                onChange={validateName}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="success"
                sx={{
                  margin: '0.5rem 0 0 1rem',
                  backgroundColor: '#363740',
                  '&:hover': { backgroundColor: '#66bb6a' },
                }}
                disabled={
                  !floatingForm || newEmployee
                    ? !nameStatus || !emailStatus
                    : !nameStatus && !emailStatus
                }
                onClick={
                  floatingForm && !newEmployee
                    ? handleEditEmployee
                    : handleAddEmployee
                }
              >
                {floatingForm && !newEmployee ? 'Update' : 'Add'}
              </Button>
            </Box>
            <TextField
              fullWidth
              required
              margin="normal"
              id="employee-email"
              label="Email"
              variant="outlined"
              value={emailInput}
              onChange={validateEmail}
            />
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeForm;
