import { createContext, useState, useEffect, useContext } from 'react';
import { Paper } from '@mui/material';
import axios from 'axios';
import { useAuth } from '../../firebase/AuthContext';
import { ForkLeft, ForkRight } from '@mui/icons-material';

const URI = 'https://bugoff.rakilahmed.com/api/tasks';
const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const { user, getToken } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await axios.get(URI);
      setTasks(res.data.reverse());
    };
    fetchTasks();
  }, []);

  axios.interceptors.request.use(
    async (config) => {
      config.headers.authorization = 'Bearer ' + (await getToken());
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const addTask = async (title) => {
    const newTask = {
      uid: `${user.uid}`,
      taskId: Math.floor(1000 + Math.random() * 9000),
      title: title,
    };

    setTasks([newTask, ...tasks]);
  };

  const editTask = async (taskId, title) => {
    const newTask = {
      uid: `${user.uid}`,
      taskId: Math.floor(1000 + Math.random() * 9000),
      title: title,
    };
    setTasks(
      tasks.map((task) => {
        return task.taskId === taskId ? { ...newTask } : task;
      })
    );
  };

  const deleteTask = async (taskId) => {
    const updatedTasks = tasks.filter((task) => {
      return task.taskId !== taskId;
    });
    setTasks(updatedTasks);
  };

  const contextValue = { tasks, addTask, editTask, deleteTask };

  return (
    <Paper
      sx={{
        marginTop: 2,
        padding: 2,
        borderRadius: 2,
        boxShadow: 'rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;',
      }}
    >
      <TaskContext.Provider value={contextValue}>
        {children}
      </TaskContext.Provider>
    </Paper>
  );
};

export const useTaskContext = () => useContext(TaskContext);
export default TaskProvider;
