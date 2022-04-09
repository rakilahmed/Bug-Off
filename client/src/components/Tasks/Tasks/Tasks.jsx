import React from 'react';
import { Paper, Typography } from '@mui/material/';
import TaskForm from '../TaskForm';
import RecentTask from './Task';
import { useTaskContext } from '../TaskProvider';

const Tasks = () => {
  const { tasks } = useTaskContext();
  return (
    <Paper
      sx={{
        padding: 2,
        borderRadius: 2,
        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
      }}
    >
      <TaskForm title="Tasks" />
      {tasks.length > 0 ? (
        tasks.map((task) => {
          return <RecentTask key={task._id} task={task} />;
        })
      ) : (
        <Typography sx={{ marginTop: 2 }} varient="body1">
          No tasks to do.
        </Typography>
      )}
    </Paper>
  );
};

export default Tasks;
