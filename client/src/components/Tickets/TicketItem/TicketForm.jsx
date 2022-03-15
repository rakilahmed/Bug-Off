import { useState } from 'react';
import { Box, FormGroup, TextField, Button } from '@mui/material/';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const TicketForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [assignedToInput, setAssignedToInput] = useState('');
  const [summaryInput, setSummaryInput] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [titleStatus, setTitleStatus] = useState(false);
  const [assignedToStatus, setAssignedToStatus] = useState(false);
  const [summaryStatus, setSummaryStatus] = useState(false);

  const handleForm = (event) => {
    setShowForm(!showForm);
    setTitleInput('');
    setAssignedToInput('');
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
    addTicket(titleInput, assignedToInput, summaryInput);
    setShowForm(!showForm);
  };

  const addTicket = (titleInput, assignedToInput, summaryInput) => {
    const ticket = {
      title: titleInput,
      assignedTo: assignedToInput,
      dueDate: dueDate,
      summary: summaryInput,
    };

    console.log(ticket);
  };

  return (
    <Box>
      <Box
        mt={5}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          color={!showForm ? 'primary' : 'secondary'}
          onClick={handleForm}
        >
          {!showForm ? 'Create New Ticket' : 'Cancel'}
        </Button>
      </Box>
      {showForm && (
        <FormGroup
          noValidate
          style={{
            maxWidth: '30rem',
            margin: 'auto',
          }}
        >
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
              style={{ margin: '0.5rem 0 0 1rem' }}
              disabled={!titleStatus || !assignedToStatus || !summaryStatus}
            >
              Add
            </Button>
          </Box>
          <TextField
            fullWidth
            required
            margin="normal"
            id="ticket-assigned"
            label="Ticket Assigned To"
            variant="outlined"
            value={assignedToInput}
            onChange={validateAssigned}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              disablePast
              value={dueDate}
              onChange={setDueDate}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Due Date"
                  fullWidth
                  margin="normal"
                />
              )}
            />
          </LocalizationProvider>
          <TextField
            fullWidth
            required
            margin="normal"
            id="ticket-description"
            label="Ticket Description"
            variant="outlined"
            multiline
            rows={5}
            value={summaryInput}
            onChange={validateDescription}
          />
        </FormGroup>
      )}
    </Box>
  );
};

export default TicketForm;
