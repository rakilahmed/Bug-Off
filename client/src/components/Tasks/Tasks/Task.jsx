import React, { useState } from 'react';
import { Box, Modal, Typography, Button } from '@mui/material/';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useTaskContext } from '../TaskProvider';
import TaskForm from '../TaskForm';

const RecentTask = ({ task }) => {
  const { deleteTask } = useTaskContext();
  const [showTask, setShowTask] = useState(false);
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
          cursor: 'pointer',
          userSelect: 'none',
        }}
        onClick={() => setShowTask(!showTask)}
      >
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 'bold', wordBreak: 'break-all' }}
        >
          {task.task}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!showTask ? <ArrowDropDown /> : <ArrowDropUp />}
        </Box>
      </Box>

      {showTask && (
        <React.Fragment>
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
              onClick={() => deleteTask(task.taskId)}
            >
              Delete
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default RecentTask;
