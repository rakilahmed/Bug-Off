import { useState } from 'react';
import { Container, Box, Button, TextField } from '@mui/material';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Dashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [assignedInput, setAssignedInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [titleStatus, setTitleStatus] = useState(false);
  const [assignedStatus, setAssignedStatus] = useState(false);
  const [descriptionStatus, setDescriptionStatus] = useState(false);

  const handleForm = (event) => {
    setShowForm(!showForm);
    setTitleInput('');
    setAssignedInput('');
    setDescriptionInput('');
    setTitleStatus(false);
    setAssignedStatus(false);
    setDescriptionStatus(false);
  };

  const validateTitle = (event) => {
    setTitleInput(event.target.value);
    event.target.value === '' ? setTitleStatus(false) : setTitleStatus(true);
  };

  const validateDescription = (event) => {
    setDescriptionInput(event.target.value);
    event.target.value === ''
      ? setDescriptionStatus(false)
      : setDescriptionStatus(true);
  };

  const validateAssigned = (event) => {
    setAssignedInput(event.target.value);
    event.target.value === ''
      ? setAssignedStatus(false)
      : setAssignedStatus(true);
  };

  const handleAddTicket = (event) => {
    event.preventDefault();
    addTicket(titleInput, assignedInput, descriptionInput);
    setShowForm(!showForm);
  };

  const addTicket = (titleInput, assignedInput, descriptionInput) => {
    const ticket = {
      title: titleInput,
      assignedTo: assignedInput,
      description: descriptionInput,
    };

    console.log(ticket);
  };

  return (
    <Container>
      <Header />
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
        <form
          onSubmit={handleAddTicket}
          noValidate
          style={{
            maxWidth: '34rem',
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
              variant="contained"
              size="large"
              color="success"
              style={{ margin: '0.5rem 0 0 1rem' }}
              disabled={!titleStatus || !assignedStatus || !descriptionStatus}
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
            value={assignedInput}
            onChange={validateAssigned}
          />
          <TextField
            fullWidth
            required
            margin="normal"
            id="ticket-description"
            label="Ticket Description"
            variant="outlined"
            multiline
            rows={5}
            value={descriptionInput}
            onChange={validateDescription}
          />
        </form>
      )}
      <Footer />
    </Container>
  );
};

export default Dashboard;