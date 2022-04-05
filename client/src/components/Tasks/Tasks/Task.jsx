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

const RecentTask = ({ task }) => {
  const { deleteTask } = useTaskContext();
  const [openEditForm, setOpenEditForm] = useState(false);

  const handleOpenEditForm = () => setOpenEditForm(true);
  const handleCloseEditForm = () => setOpenEditForm(false);

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
            <TaskForm openEditForm task={task} />
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
          userSelect: 'none',
        }}
      >
        <Typography variant="subtitle1" sx={{ wordBreak: 'break-all' }}>
          {task.task}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Tooltip title="Done" onClick={() => deleteTask(task.taskId)}>
            <IconButton>
              <AiOutlineCheck style={{ fontSize: 22, color: '#363740' }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit" onClick={handleOpenEditForm}>
            <IconButton>
              <AiOutlineEdit style={{ fontSize: 22, color: '#363740' }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
};

export default RecentTask;
