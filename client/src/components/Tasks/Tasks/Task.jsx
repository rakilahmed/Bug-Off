import React, { useState } from 'react';
import { Box, Typography, Tooltip, IconButton } from '@mui/material/';
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';
import { useTaskContext } from '../TaskProvider';
import FloatingForm from '../../Utils/FloatingForm';

const Task = ({ task }) => {
  const { deleteTask } = useTaskContext();
  const [floatingForm, setFloatingForm] = useState(false);

  const handleOpenFloatingForm = () => setFloatingForm(true);
  const handleCloseFloatingForm = () => setFloatingForm(false);

  if (floatingForm) {
    return (
      <FloatingForm
        forTask={true}
        floatingForm
        closeForm={handleCloseFloatingForm}
        task={task}
      />
    );
  }

  return (
    <Box
      sx={{
        border: '1px solid #e6e6e6',
        padding: '0.2rem 0.5rem',
        borderRadius: 2,
        margin: '1rem auto',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="subtitle1">{task.task}</Typography>
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Done" onClick={() => deleteTask(task._id)}>
            <IconButton>
              <AiOutlineCheck style={{ fontSize: 20, color: '#363740' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" onClick={handleOpenFloatingForm}>
            <IconButton>
              <AiOutlineEdit style={{ fontSize: 20, color: '#363740' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default Task;
