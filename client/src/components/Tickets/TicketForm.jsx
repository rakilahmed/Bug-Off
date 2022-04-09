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

const TicketForm = ({
  title,
  newTicket = false,
  floatingForm = false,
  closeForm,
  ticket,
}) => {
  const { addTicket, editTicket } = useTicketContext();
  const [showForm, setShowForm] = useState(floatingForm ? floatingForm : false);
  const [titleInput, setTitleInput] = useState(ticket ? ticket.title : '');
  const [assignedToInput, setAssignedToInput] = useState(
    ticket ? ticket.assigned_to : ''
  );
  const [priority, setPriority] = useState(
    ticket ? ticket.priority : '' || newTicket ? 'Low' : ''
  );
  const [dueDate, setDueDate] = useState(ticket ? ticket.due_date : new Date());
  const [summaryInput, setSummaryInput] = useState(
    ticket ? ticket.summary : ''
  );
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

  const validateTitle = (event) => {
    setTitleInput(event.target.value);
    event.target.value === '' ? setTitleStatus(false) : setTitleStatus(true);
  };

  const validateAssigned = (event) => {
    setAssignedToInput(event.target.value);
    event.target.value === ''
      ? setAssignedToStatus(false)
      : setAssignedToStatus(true);
  };

  const validatePriority = (event) => {
    setPriority(event.target.value);
    event.target.value === ticket.priority
      ? setPriorityStatus(false)
      : setPriorityStatus(true);
  };

  const validateDueDate = (newDate) => {
    setDueDate(newDate);
    newDate === ticket.due_data
      ? setDueDateStatus(false)
      : setDueDateStatus(true);
  };

  const validateSummary = (event) => {
    setSummaryInput(event.target.value);
    event.target.value === ''
      ? setSummaryStatus(false)
      : setSummaryStatus(true);
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
                margin="normal"
                id="ticket-title"
                label="Title"
                variant="outlined"
                value={titleInput}
                onChange={validateTitle}
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
                    ? !titleStatus || !assignedToStatus || !summaryStatus
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
            <TextField
              required
              margin="normal"
              id="ticket-assigned"
              label="Assigned To"
              variant="outlined"
              value={assignedToInput}
              onChange={validateAssigned}
            />
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
                  value={priority}
                  label="Priority"
                  onChange={
                    floatingForm && !newTicket
                      ? validatePriority
                      : (e) => setPriority(e.target.value)
                  }
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
              margin="normal"
              id="ticket-summary"
              label="Summary"
              variant="outlined"
              multiline
              rows={5}
              value={summaryInput}
              onChange={validateSummary}
            />
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};

export default TicketForm;
