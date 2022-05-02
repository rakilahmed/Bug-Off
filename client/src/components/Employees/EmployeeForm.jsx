import { useState } from 'react';
import { Box, FormGroup, TextField, Button } from '@mui/material/';
import { useEmployeeContext } from './EmployeeProvider';
import { validateEmail } from '../Utils/Validation';

const EmployeeForm = ({
  floatingForm = false,
  newEmployee = false,
  closeForm,
  employee,
}) => {
  const { employees, addEmployee, editEmployee } = useEmployeeContext();
  const [showForm, setShowForm] = useState(floatingForm ? floatingForm : false);
  const [nameInput, setNameInput] = useState(employee ? employee.name : '');
  const [emailInput, setEmailInput] = useState(employee ? employee.email : '');
  const [nameHelperText, setNameHelperText] = useState('');
  const [emailHelperText, setEmailHelperText] = useState('');
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setNameInput(value);
      handleValidation(value, name);
    } else if (name === 'email') {
      setEmailInput(value);
      handleValidation(value, name);
    }
  };

  const handleValidation = (value, name) => {
    if (name === 'name') {
      if (value.length > 0 && value.length < 3) {
        setNameStatus(false);
        setNameHelperText('Name must be at least 3 characters');
      } else if (value.length === 0) {
        setNameStatus(false);
        setNameHelperText('Name is required');
      } else {
        setNameStatus(true);
        setNameHelperText('');
      }
    } else if (name === 'email') {
      if (value.length === 0) {
        setEmailStatus(false);
        setEmailHelperText('Email is required');
      } else if (validateEmail(value)) {
        const employee = employees.filter(
          (employee) => employee.email === value.toLowerCase()
        );
        if (employee.length > 0) {
          setEmailStatus(false);
          setEmailHelperText('Employee with this email already exists');
        } else {
          setEmailStatus(true);
          setEmailHelperText('');
        }
      } else if (employee) {
        setEmailStatus(false);
        setEmailHelperText('Email already in use');
      } else {
        setEmailStatus(false);
        setEmailHelperText('Email is invalid');
      }
    }
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
                error={nameHelperText ? true : false}
                margin="normal"
                name="name"
                label="Name"
                variant="outlined"
                value={nameInput}
                onChange={handleChange}
                helperText={nameHelperText}
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
              error={emailHelperText ? true : false}
              margin="normal"
              name="email"
              label="Email"
              variant="outlined"
              value={emailInput}
              onChange={handleChange}
              helperText={emailHelperText}
            />
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};

export default EmployeeForm;
