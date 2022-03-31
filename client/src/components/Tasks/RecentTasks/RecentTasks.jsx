import React from 'react';
import { Box, Typography } from '@mui/material/';
import TaskForm from '../TaskForm';
import RecentTask from './RecentTask';
import { useTaskContext } from '../TaskProvider';

const RecentTasks = () => {
  const { tasks } = useTaskContext();
  return (
    <Box>
      <TaskForm title="Recent Tasks" />
      {tasks.length > 0 ? (
        tasks.map((task) => {
          return <RecentTask key={task.taskId} task={task} />;
        })
      ) : (
        <Typography sx={{ marginTop: 2 }} varient="body1">
          No open tasks to show.
        </Typography>
      )}
    </Box>
  );
};

export default RecentTasks;
