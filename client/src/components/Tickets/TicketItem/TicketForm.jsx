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
} from '@mui/material/';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const TicketForm = ({ onAddTicket }) => {
  const [showForm, setShowForm] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [assignedToInput, setAssignedToInput] = useState('');
  const [summaryInput, setSummaryInput] = useState('');
  const [priority, setPriority] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [titleStatus, setTitleStatus] = useState(false);
  const [assignedToStatus, setAssignedToStatus] = useState(false);
  const [summaryStatus, setSummaryStatus] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
    setTitleInput('');
    setAssignedToInput('');
    setPriority('Low');
    setSummaryInput('');
    setTitleStatus(false);
    setAssignedToStatus(false);
    setSummaryStatus(false);
  };

  const validateTitle = (event) => {
    setTitleInput(event.target.value);
    event.target.value === '' ? setTitleStatus(false) : setTitleStatus(true);
  };

  const validateDescription = (event) => {
    setSummaryInput(event.target.value);
    event.target.value === ''
      ? setSummaryStatus(false)
      : setSummaryStatus(true);
  };

  const validateAssigned = (event) => {
    setAssignedToInput(event.target.value);
    event.target.value === ''
      ? setAssignedToStatus(false)
      : setAssignedToStatus(true);
  };

  const handleAddTicket = (event) => {
    event.preventDefault();
    onAddTicket(titleInput, assignedToInput, priority, dueDate, summaryInput);
    setShowForm(!showForm);
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6">Tickets</Typography>
        <Button
          variant="contained"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#363740',
            '&:hover': { backgroundColor: '#363740' },
          }}
          onClick={handleForm}
        >
          {!showForm ? 'New Ticket' : 'Cancel'}
        </Button>
      </Box>
      {showForm && (
        <Box
          sx={{
            maxWidth: '40rem',
            margin: '0 auto 1rem auto',
          }}
        >
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
                label="Ticket Title"
                variant="outlined"
                value={titleInput}
                onChange={validateTitle}
              />
              <Button
                type="submit"
                onClick={handleAddTicket}
                variant="contained"
                size="large"
                color="success"
                sx={{
                  margin: '0.5rem 0 0 1rem',
                  backgroundColor: '#363740',
                  '&:hover': { backgroundColor: '#66bb6a' },
                }}
                disabled={!titleStatus || !assignedToStatus || !summaryStatus}
              >
                Add
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
                  onChange={(e) => setPriority(e.target.value)}
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
                  onChange={setDueDate}
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
              onChange={validateDescription}
            />
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};

export default TicketForm;
