import React, { useState } from 'react';
import {
  Box,
  Modal,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from '@mui/material/';
import { AiOutlineEdit, AiOutlineCheck } from 'react-icons/ai';
import { useTaskContext } from '../TaskProvider';
import TaskForm from '../TaskForm';

const Task = ({ task }) => {
  const { deleteTask } = useTaskContext();
  const [floatingForm, setFloatingForm] = useState(false);

  const handleOpenFloatingForm = () => setFloatingForm(true);
  const handleCloseFloatingForm = () => setFloatingForm(false);

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

  if (floatingForm) {
    return (
      <Box>
        <Modal
          keepMounted
          open={floatingForm}
          onClose={handleCloseFloatingForm}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <Button
              fullWidth
              variant="outlined"
              sx={{
                mt: 1,
                mb: 2,
              }}
              onClick={handleCloseFloatingForm}
            >
              Close
            </Button>
            <TaskForm
              floatingForm
              closeForm={handleCloseFloatingForm}
              task={task}
            />
          </Box>
        </Modal>
      </Box>
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
          userSelect: 'none',
        }}
      >
        <Typography variant="subtitle1" sx={{ wordBreak: 'break-all' }}>
          {task.task}
        </Typography>
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
