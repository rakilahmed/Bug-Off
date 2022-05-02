import { useState } from 'react';
import {
  Box,
  FormGroup,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
} from '@mui/material/';
import { GrAdd, GrClose } from 'react-icons/gr';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useTicketContext } from './TicketProvider';
import { useEmployeeContext } from '../Employees/EmployeeProvider';

const TicketForm = ({
  title,
  newTicket = false,
  floatingForm = false,
  closeForm,
  ticket,
}) => {
  const { accountType, addTicket, editTicket } = useTicketContext();
  const { employees } = useEmployeeContext();
  const [showForm, setShowForm] = useState(floatingForm ? floatingForm : false);
  const [titleInput, setTitleInput] = useState(ticket ? ticket.title : '');
  const [assignedToInput, setAssignedToInput] = useState(
    ticket ? ticket.assigned_to : ''
  );
  const [priority, setPriority] = useState(ticket ? ticket.priority : '');
  const [dueDate, setDueDate] = useState(ticket ? ticket.due_date : new Date());
  const [summaryInput, setSummaryInput] = useState(
    ticket ? ticket.summary : ''
  );
  const [titleHelperText, setTitleHelperText] = useState('');
  const [summaryHelperText, setSummaryHelperText] = useState('');
  const [titleStatus, setTitleStatus] = useState(false);
  const [assignedToStatus, setAssignedToStatus] = useState(false);
  const [priorityStatus, setPriorityStatus] = useState(false);
  const [dueDateStatus, setDueDateStatus] = useState(false);
  const [summaryStatus, setSummaryStatus] = useState(false);

  const handleForm = () => {
    newTicket && closeForm();
    setShowForm(!showForm);
    setTitleInput('');
    setAssignedToInput('');
    setSummaryInput('');
    setPriority('Low');
    setTitleStatus(false);
    setAssignedToStatus(false);
    setSummaryStatus(false);
  };

  const handleFloatingForm = () => {
    closeForm();
    setTitleStatus(false);
    setAssignedToStatus(false);
    setSummaryStatus(false);
    setPriorityStatus(false);
    setDueDateStatus(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'title') {
      setTitleInput(value);
      handleValidation(value, 'title');
    } else if (name === 'assigned-to') {
      setAssignedToInput(value);
      handleValidation(value, 'assigned-to');
    } else if (name === 'priority') {
      setPriority(value);
      handleValidation(value, 'priority');
    } else if (name === 'summary') {
      setSummaryInput(value);
      handleValidation(value, 'summary');
    }
  };

  const handleValidation = (value, type) => {
    if (type === 'title') {
      if (value.length === 0) {
        setTitleStatus(false);
        setTitleHelperText('Title is required');
      } else if (value.length > 0 && value.length < 3) {
        setTitleStatus(false);
        setTitleHelperText('Title must be at least 3 characters');
      } else {
        setTitleStatus(true);
        setTitleHelperText('');
      }
    } else if (type === 'assigned-to') {
      if (floatingForm && !newTicket && value === ticket.assigned_to) {
        setAssignedToStatus(false);
      } else {
        setAssignedToStatus(true);
      }
    } else if (type === 'priority') {
      if (floatingForm && !newTicket && value === ticket.priority) {
        setPriorityStatus(false);
      } else {
        setPriorityStatus(true);
      }
    } else if (type === 'summary') {
      if (value.length === 0) {
        setSummaryStatus(false);
        setSummaryHelperText('Summary is required');
      } else {
        setSummaryStatus(true);
        setSummaryHelperText('');
      }
    }
  };

  const validateDueDate = (newDate) => {
    setDueDate(newDate);
    newDate === ticket.due_data
      ? setDueDateStatus(false)
      : setDueDateStatus(true);
  };

  const handleAddTicket = (event) => {
    event.preventDefault();
    addTicket(titleInput, assignedToInput, priority, dueDate, summaryInput);
    handleForm();
  };

  const handleEditTicket = (event) => {
    event.preventDefault();
    editTicket(
      ticket._id,
      assignedToInput,
      titleInput,
      summaryInput,
      priority,
      dueDate,
      ticket.created_at
    );
    handleFloatingForm();
  };

  return (
    <Box>
      {!floatingForm && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">{title}</Typography>
          {!showForm ? (
            <Tooltip title="Add Ticket" onClick={handleForm}>
              <IconButton>
                <GrAdd style={{ fontSize: 25 }} />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Close" onClick={handleForm}>
              <IconButton>
                <GrClose style={{ fontSize: 25 }} />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      )}
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
                error={titleHelperText ? true : false}
                margin="normal"
                name="title"
                label="Title"
                variant="outlined"
                value={titleInput}
                onChange={handleChange}
                helperText={titleHelperText}
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
                  !floatingForm || newTicket
                    ? !titleStatus || !summaryStatus
                    : !titleStatus &&
                      !assignedToStatus &&
                      !summaryStatus &&
                      !priorityStatus &&
                      !dueDateStatus
                }
                onClick={
                  floatingForm && !newTicket
                    ? handleEditTicket
                    : handleAddTicket
                }
              >
                {floatingForm && !newTicket ? 'Update' : 'Add'}
              </Button>
            </Box>
            {accountType === 'pm' && (
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Assigned To</InputLabel>
                <Select
                  name="assigned-to"
                  label="Assigned To"
                  value={assignedToInput || 'Self'}
                  onChange={handleChange}
                >
                  <MenuItem value="Self">Self</MenuItem>
                  {employees.map((employee) => (
                    <MenuItem key={employee._id} value={employee.name}>
                      {employee.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <FormControl fullWidth sx={{ mt: 1, mr: 1 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  name="priority"
                  label="Priority"
                  value={priority || 'Low'}
                  onChange={handleChange}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  disablePast
                  value={dueDate}
                  onChange={
                    floatingForm && !newTicket ? validateDueDate : setDueDate
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      margin="normal"
                      label="Due Date"
                    />
                  )}
                />
              </LocalizationProvider>
            </Box>
            <TextField
              required
              fullWidth
              error={summaryHelperText ? true : false}
              margin="normal"
              name="summary"
              label="Summary"
              variant="outlined"
              multiline
              rows={5}
              value={summaryInput}
              onChange={handleChange}
              helperText={summaryHelperText}
            />
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};

export default TicketForm;
