import { useState } from 'react';
import {
  Box,
  FormGroup,
  TextField,
  Button,
  Typography,
  Tooltip,
  IconButton,
} from '@mui/material/';
import { GrAdd, GrClose } from 'react-icons/gr';
import { useTaskContext } from './TaskProvider';

const TaskForm = ({ title, openEditForm = false, task }) => {
  const { addTask, editTask } = useTaskContext();
  const [showForm, setShowForm] = useState(openEditForm ? openEditForm : false);
  const [taskInput, setTaskInput] = useState(task ? task.task : '');
  const [titleStatus, setTitleStatus] = useState(false);

  const handleForm = () => {
    setShowForm(!showForm);
    setTaskInput('');
    setTitleStatus(false);
  };

  const handleEditForm = () => {
    setTitleStatus(false);
  };

  const validateTitle = (event) => {
    setTaskInput(event.target.value);
    event.target.value === '' ? setTitleStatus(false) : setTitleStatus(true);
  };

  const handleAddTask = (event) => {
    event.preventDefault();
    addTask(taskInput);
    setShowForm(!showForm);
  };

  const handleEditTask = (event) => {
    event.preventDefault();
    editTask(task.taskId, taskInput);
    handleEditForm();
  };

  return (
    <Box>
      {!openEditForm && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6">{title}</Typography>
          {!showForm ? (
            <Tooltip title="Add Task" onClick={handleForm}>
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
        <Box
          sx={{
            maxWidth: '33rem',
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
                id="task-title"
                label="Task"
                variant="outlined"
                value={taskInput}
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
                disabled={!openEditForm ? !titleStatus : !titleStatus}
                onClick={openEditForm ? handleEditTask : handleAddTask}
              >
                {openEditForm ? 'Update' : 'Add'}
              </Button>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            ></Box>
          </FormGroup>
        </Box>
      )}
    </Box>
  );
};

export default TaskForm;
