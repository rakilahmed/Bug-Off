import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  FormGroup,
  FormControl,
  InputLabel,
  TextField,
  Select,
  MenuItem,
} from '@mui/material/';
import moment from 'moment';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { LocalizationProvider, DateTimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const TicketItem = ({ ticket, onEditTicket, onDeleteTicket }) => {
  const [showTicket, setShowTicket] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [titleInput, setTitleInput] = useState(ticket.title);
  const [assignedToInput, setAssignedToInput] = useState(ticket.assignedTo);
  const [summaryInput, setSummaryInput] = useState(ticket.summary);
  const [priority, setPriority] = useState(ticket.priority);
  const [dueDate, setDueDate] = useState(ticket.dueDate);
  const [titleStatus, setTitleStatus] = useState(false);
  const [assignedToStatus, setAssignedToStatus] = useState(false);
  const [summaryStatus, setSummaryStatus] = useState(false);
  const [priorityStatus, setPriorityStatus] = useState(false);

  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => {
    setTitleInput(ticket.title);
    setAssignedToInput(ticket.assignedTo);
    setSummaryInput(ticket.summary);
    setPriority(ticket.priority);
    setDueDate(ticket.dueDate);
    setTitleStatus(false);
    setAssignedToStatus(false);
    setSummaryStatus(false);
    setPriorityStatus(false);
    setOpenEditForm(false);
  };

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

  const validateTitle = (event) => {
    setTitleInput(event.target.value);
    event.target.value === ticket.titleInput
      ? setTitleStatus(false)
      : setTitleStatus(true);
  };

  const validateAssigned = (event) => {
    setAssignedToInput(event.target.value);
    event.target.value === ticket.assignedTo
      ? setAssignedToStatus(false)
      : setAssignedToStatus(true);
  };

  const validateSummary = (event) => {
    setSummaryInput(event.target.value);
    event.target.value === ticket.summaryInput
      ? setSummaryStatus(false)
      : setSummaryStatus(true);
  };

  const validatePriority = (event) => {
    setPriority(event.target.value);
    event.target.value === ticket.priority
      ? setPriorityStatus(false)
      : setPriorityStatus(true);
  };

  const handleEditTicket = (event) => {
    event.preventDefault();
    onEditTicket(
      ticket.ticketId,
      titleInput,
      assignedToInput,
      priority,
      dueDate,
      summaryInput
    );
    setOpenEditForm(!openEditForm);
  };

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
                  onClick={handleEditTicket}
                  variant="contained"
                  size="large"
                  color="success"
                  sx={{
                    margin: '0.5rem 0 0 1rem',
                    backgroundColor: '#363740',
                    '&:hover': { backgroundColor: '#66bb6a' },
                  }}
                  disabled={
                    !titleStatus &&
                    !assignedToStatus &&
                    !summaryStatus &&
                    !priorityStatus
                  }
                >
                  Update
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
              <FormControl fullWidth sx={{ mt: 1 }}>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
                  label="Priority"
                  onChange={validatePriority}
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
        </Modal>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        border: '1px solid #e6e6e6',
        padding: 1,
        borderRadius: 2,
        margin: '1rem auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setShowTicket(!showTicket)}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', wordBreak: 'break-all' }}
        >
          {ticket.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="caption">[{ticket.priority}]</Typography>
          {!showTicket ? <ArrowDropDown /> : <ArrowDropUp />}
        </Box>
      </Box>

      {showTicket && (
        <React.Fragment>
          <Box mt={1} sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="caption">
              Submitted: {moment(ticket.createdAt).startOf().fromNow()}
            </Typography>
            <Typography variant="caption">By: {ticket.submittedBy}</Typography>
            <Typography variant="caption">
              Assigned to: {ticket.assignedTo}
            </Typography>
            <Typography variant="caption">
              Due: {moment(ticket.dueDate).endOf().fromNow()}
            </Typography>
          </Box>
          <Typography
            variant="body1"
            sx={{
              borderTop: '1px solid #e6e6e6',
              padding: 2,
              borderBottom: '1px solid #e6e6e6',
            }}
          >
            {ticket.summary}
          </Typography>
          <Box
            m={1.5}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{ marginRight: 1 }}
              variant="contained"
              size="small"
              color="primary"
              onClick={handleOpenEditForm}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              size="small"
              color="error"
              onClick={() => onDeleteTicket(ticket.ticketId)}
            >
              Delete
            </Button>
          </Box>
          <Typography variant="caption">
            Last updated: {moment(ticket.updatedAt).startOf().fromNow()}
          </Typography>
        </React.Fragment>
      )}
    </Box>
  );
};

export default TicketItem;
